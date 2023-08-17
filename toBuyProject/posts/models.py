#import uuid
from django.db import models
from accounts.models import *
from django.urls import reverse
from accounts.models import User
from django.core.exceptions import ValidationError
from datetime import datetime


CATEGORIES = (
    ('cate1', '패션의류/잡화'),
    ('cate2', '뷰티'),
    ('cate3', '식품'),
    ('cate4', '생필품'),
    ('cate5', '홈데코'),
    ('cate6', '건강'),
)

TYPES = (
    ('type1', '일반결제'),
    ('type2', '간편결제'),
)

class Products(models.Model) :
    product_id = models.CharField(verbose_name="커스텀 ID", primary_key=True, max_length=10)
    image = models.ImageField(verbose_name='제품 이미지', blank=True, null=True, upload_to='post-image')
    name = models.CharField(verbose_name="제품 이름", max_length=128)
    price = models.IntegerField(verbose_name="제품 가격", default=0)
    category = models.CharField(verbose_name="카테고리명", choices=CATEGORIES, default='cate1', max_length=20)
    
    def __str__(self):
        return self.name
    
    class Meta:
        unique_together = ['product_id'] 
    
    def get_absolute_url(self):
        return reverse('product_detail', kwargs={'product_id': self.product_id})

class Card(models.Model) :
    num = models.CharField(verbose_name="카드 번호", max_length=16) 
    cvc = models.CharField(verbose_name="카드 cvc", max_length=3) 
    validDate = models.DateField(verbose_name="유효기간", default=datetime(2024, 8, 1))
    pw = models.CharField(verbose_name="카드 비밀번호", max_length=4)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    balance = models.IntegerField(verbose_name="카드 잔액", default=500000)
    
    def __str__(self):
        return self.num
    
    class Meta:
        #unique_together = ['num']  # num -> unique
        unique_together = ['customer', 'num']  # 한 사용자당 하나의 카드만 유일하도록 설정

    def save(self, *args, **kwargs):
        if not self.pk:  
            existing_card = Card.objects.filter(customer=self.customer).first()
            if existing_card:
                raise ValidationError("이미 카드가 있습니다.")  # 이미 생성된 카드가 있는 경우 저장하지 않음

        super(Card, self).save(*args, **kwargs)
    

class Purchase(models.Model) :
    image = models.ImageField(verbose_name='구매 제품 이미지', blank=True, null=True, upload_to='post-image')
    name = models.CharField(verbose_name="구매 제품 이름", max_length=128)
    price = models.IntegerField(verbose_name="구매 제품 가격", default=0)
    category = models.CharField(verbose_name="카테고리명", choices=CATEGORIES, default='cate1', max_length=20)
    count = models.IntegerField(verbose_name="구매 제품 개수", default=1)
    total = models.IntegerField(verbose_name="총 가격", default=0) # price * count
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Products, on_delete=models.CASCADE, to_field='product_id',related_name='customer_purchases')
    date = models.DateTimeField(verbose_name="구매 날짜와 시각", auto_now_add=True)
    purchase_type = models.CharField(verbose_name="결제 방식", choices=TYPES, default='type1', max_length=20)
    # register = models.ForeignKey(User, on_delete=models.CASCADE, null=True, to_field='register',related_name='register_purchases')
    # register = models.BooleanField(null=True,default=False)
    card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True) # 카드 정보 type1 일 때만 받아오기 
    
    def save(self, *args, **kwargs):
        self.total = self.price * self.count
        if self.customer:
            self.register = self.customer.register  # user.register 값 저장
        self.total = self.price * self.count
        super(Purchase, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
        
class RecentSearch(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # 사용자와 연결
    query = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    MAX_RECENT_SEARCHES = 5  # 각 사용자별로 최대 유지할 검색어 개수

    class Meta:
        ordering = ['-created_at']

    @classmethod
    def add_search(cls, user, query):  # 사용자 정보를 추가로 받도록 수정
        if query:
            # 해당 사용자의 검색어 개수 확인
            recent_searches_count = cls.objects.filter(customer=user).count()

            # 최대 개수 초과 시 오래된 검색어 삭제 후 추가
            if recent_searches_count >= cls.MAX_RECENT_SEARCHES:
                cls.objects.filter(customer=user).earliest('created_at').delete()

            recent_search = cls(customer=user, query=query)
            recent_search.save()