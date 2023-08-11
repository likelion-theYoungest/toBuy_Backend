#import uuid
from django.db import models
from accounts.models import *
from django.urls import reverse
from accounts.models import User

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

class Purchase(models.Model) :
    image = models.ImageField(verbose_name='구매 제품 이미지', blank=True, null=True, upload_to='post-image')
    name = models.CharField(verbose_name="구매 제품 이름", max_length=128)
    price = models.IntegerField(verbose_name="구매 제품 가격", default=0)
    category = models.CharField(verbose_name="카테고리명", choices=CATEGORIES, default='cate1', max_length=20)
    count = models.IntegerField(verbose_name="구매 제품 개수", default=1)
    total = models.IntegerField(verbose_name="총 가격", default=0) # price * count
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Products, on_delete=models.CASCADE, to_field='product_id')
    date = models.DateTimeField(verbose_name="구매 날짜와 시각", auto_now_add=True)
    purchase_type = models.CharField(verbose_name="결제 방식", choices=TYPES, default='type1', max_length=20)
    register = models.BooleanField(verbose_name="간편 결제 등록 여부", default=False)
    
    def save(self, *args, **kwargs):
        self.total = self.price * self.count
        super(Purchase, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name

class Card(models.Model) :
    num = models.CharField(verbose_name="카드 번호", max_length=16) 
    cvc = models.CharField(verbose_name="카드 cvc", max_length=3) 
    validDate = models.DateField(verbose_name="유효기간", auto_now_add=True)
    pw = models.CharField(verbose_name="카드 비밀번호", max_length=4)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    balance = models.IntegerField(verbose_name="카드 잔액", default=500000)
    
    def __str__(self):
        return self.num
    
    class Meta:
        #unique_together = ['num']  # num -> unique
        unique_together = ['customer', 'num']  # 한 사용자당 하나의 카드만 유일하도록 설정

    def save(self, *args, **kwargs):
        # save 메서드를 오버라이드하여 validDate를 업데이트하지 못하도록 설정합니다.
        if not self.pk:  # 새로운 인스턴스인지 확인합니다.
            self.validDate = "2023-08-18"  # 고정된 날짜를 "YYYY-MM-DD" 형식의 문자열로 설정합니다.
        super(Card, self).save(*args, **kwargs)
        
class RecentSearch(models.Model):
    query = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    MAX_RECENT_SEARCHES = 5  # 최대 유지할 검색어 개수

    class Meta:
        ordering = ['-created_at']

    @classmethod
    def add_search(cls, query):
        if query:
            recent_search = cls(query=query)
            recent_search.save()

            # 최대 개수 초과 시 오래된 검색어 삭제
            if cls.objects.count() > cls.MAX_RECENT_SEARCHES:
                cls.objects.earliest('created_at').delete()