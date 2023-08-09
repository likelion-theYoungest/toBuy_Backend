from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Products, Purchase
from .serializers import ProductSerializer, PurchaseSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import ReadOnly

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