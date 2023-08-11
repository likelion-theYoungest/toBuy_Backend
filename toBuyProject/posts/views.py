from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .models import Products, Purchase, Card, RecentSearch
from .serializers import ProductSerializer, PurchaseSerializer, CardSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import ReadOnly
from rest_framework import viewsets, permissions, status
from rest_framework.filters import SearchFilter
import random
import string
from django.db import transaction


class ProductViewSet(ModelViewSet) :
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [ReadOnly]
    
    # 검색 기능 
    filter_backends = [SearchFilter]
    search_fields = ['name']
    
    # 최근 검색어 저장
    def add_to_recent_searches(self, user, query):
        RecentSearch.add_search(user, query)
        recent_searches = RecentSearch.objects.filter(customer=user).order_by('-created_at')[:RecentSearch.MAX_RECENT_SEARCHES]
        self.recent_searches = [search.query for search in recent_searches]

    # 최근 검색어 반환
    @action(detail=False, methods=['get'])
    def recent_searches_list(self, request):
        if not request.user.is_authenticated :
            return Response({"message" : "로그인을 해주세요."}, status=status.HTTP_401_UNAUTHORIZED)
        
        self.add_to_recent_searches(request.user, None)
        recent_searches = RecentSearch.objects.filter(customer=request.user).order_by('-created_at')[:RecentSearch.MAX_RECENT_SEARCHES]
        searches = [search.query for search in recent_searches]
        return Response(searches, status=status.HTTP_200_OK)

    # 검색어 -> 함수로 넘겨줌
    def list(self, request, *args, **kwargs):
        search_query = self.request.query_params.get('search', None)
        self.add_to_recent_searches(request.user, search_query)
        return super().list(request, *args, **kwargs)
    
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
            'image' : product.image.url, 
            'category' : product.category,
        }
        return Response(data)

# main -> 카테고리 별 두 개씩 가져오는 부분
class MainProductListView(APIView):
    def get(self, request, *args, **kwargs):
        categories = ['cate1', 'cate2', 'cate3', 'cate4', 'cate5', 'cate6']
        products_list = []

        for category in categories:
            products = Products.objects.filter(category=category)[:2]
            serializer = ProductSerializer(products, many=True)
            products_list.extend(serializer.data)

        return Response(products_list, status=status.HTTP_200_OK)

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
        
        if purchase_type == "type1":
            # 구매 유형이 "type1"이고 register가 False인 경우에만 실행
            card_num = request.data.get('card_num')  # 사용자가 입력한 카드 번호
            card_cvc = request.data.get('card_cvc')  # 사용자가 입력한 카드 CVC
            card_pw = request.data.get('card_pw')    # 사용자가 입력한 카드 비밀번호
            card_valid_date = request.data.get('card_valid_date')  # 사용자가 입력한 카드 유효기간

            matching_cards = Card.objects.filter(
                customer=request.user,
                num=card_num,
                cvc=card_cvc,
                pw=card_pw,
                validDate=card_valid_date 
            )

            if not matching_cards.exists():
                return Response({"message": "카드 정보가 일치하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)
            
            # 카드 정보가 일치하는 경우 카드 잔액 업데이트
            card = matching_cards.first()
            if card.balance < total:
                return Response({"message": "잔액이 부족합니다."}, status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                card.balance -= total
                card.save()

        if register == False and purchase_type == "type2" :
            return Response({"message" : "카드가 등록되지 않았습니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not request.user.is_authenticated :
            return Response({"message" : "로그인을 해주세요."}, status=status.HTTP_401_UNAUTHORIZED)
        
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


# 마이페이지
class UserProfileCardPurchasesView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"message": "로그인을 해주세요."}, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user

        profile_data = {
            'id' : user.id,
            'name' : user.name,
            'email': user.email,
            'phone': user.phone,
        }

        cards = Card.objects.filter(customer=user)
        card_serializer = CardSerializer(cards, many=True)

        purchases = Purchase.objects.filter(customer=user)
        purchase_serializer = PurchaseSerializer(purchases, many=True)

        data = {
            'profile': profile_data,
            'card': card_serializer.data,
            'purchases': purchase_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)