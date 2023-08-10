from rest_framework.viewsets import ModelViewSet
from .models import Products, Purchase, Card
from .serializers import ProductSerializer, PurchaseSerializer, CardSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import ReadOnly
from rest_framework import viewsets, permissions, status
import random
import string

class ProductViewSet(ModelViewSet) :
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [ReadOnly]

    # 메인에서 -> 카테고리 별로 2개씩만 가져오기
    def list(self, request, *args, **kwargs):
        categories = ['cate1', 'cate2', 'cate3', 'cate4', 'cate5', 'cate6']  # 카테고리 리스트 (적절히 수정하세요)
        products_list = []

        for category in categories:
            products = Products.objects.filter(category=category)[:2]
            serializer = self.serializer_class(products, many=True)
            products_list.extend(serializer.data)

        return Response(products_list)

    # products/카테고리명(ex.cate1)/ : 카테고리 별로 출력 
    @action(detail=False, methods=['get'])
    def list_by_category(self, request, category=None):
        products = Products.objects.filter(category=category)
        serializer = self.serializer_class(products, many=True)
        return Response(serializer.data)

    # detail ) products/카테고리명/product_id/ : 각 항목의 detail
    @action(detail=True, methods=['get'])
    def product_detail(self, request, category=None, product_id=None):
        product = get_object_or_404(Products, category=category, product_id=product_id)
        data = {
            'id': product.product_id,
            'name': product.name,
            'price': product.price,
            'image' : product.image.url,  # 이미지 URL 가져오기
            'category' : product.category,
        }
        return Response(data)

class CardPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return request.user.is_authenticated
        return True
    
class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [CardPermission]

    def create(self, request, *args, **kwargs):
        num = ''.join(random.choices(string.digits, k=16))
        cvc = ''.join(random.choices(string.digits, k=3))
        pw = ''.join(random.choices(string.digits, k=4))
        
        serializer = self.get_serializer(data={
            'num': num,
            'cvc': cvc,
            'pw': pw,
            'customer': request.user.id,  # 또는 적절한 user 식별자
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({"message": "Card created successfully"}, status=status.HTTP_201_CREATED)

    
# Purchase 
class PurchaseViewSet(ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def create(self, request, *args, **kwargs):
        # request Body ) 프론트에서 받아올 것들 3개 -> 개수 / 결제 타입 / 상품 product_id
        count = int(request.data.get('count'))
        purchase_type = request.data.get('purchase_type')
        custom_product_id = request.data.get('product')
        register = request.data.get('register') # 카드 등록 여부 프론트 한테 받아옵니다 (True, False)
        if register == None : 
            register = False # 만약 못 받아오면 우선 -> False가 되도록 !! 
        
        # 커스텀 product_id로 상품을 조회하고 나머지 필드 값 설정
        product = Products.objects.get(product_id=custom_product_id)
        total = int(product.price * count)

        purchase = Purchase(
            image=product.image,
            name=product.name,
            price=product.price,
            category=product.category,
            count=count,
            total=total,
            customer=request.user,
            product=product,
            purchase_type=purchase_type,
            register=register 
        )
        purchase.save()

        serializer = self.serializer_class(purchase)
        return Response(serializer.data)
    
    # customer(현재 로그인)의 구매 내역을 가져오기 -> mypage 부분 
    @action(detail=False, methods=['get'])
    def my_purchases(self, request):
        user = request.user  # 현재 로그인한 사용자
        purchases = Purchase.objects.filter(customer=user)
        serializer = self.serializer_class(purchases, many=True)
        return Response(serializer.data)
