from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .models import Products, Purchase, Card, RecentSearch
from .serializers import ProductSerializer, PurchaseSerializer, CardSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import ReadOnly
from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter
from accounts.models import User
import random
import string
from django.db import transaction
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
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
        if not request.user.is_authenticated :
            return Response({"message" : "로그인을 해주세요."}, status=status.HTTP_401_UNAUTHORIZED)
        
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


    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def recharge(self, request):
        try:
            user = request.user

            # 일정 금액 충전하기
            recharge_amount = 30000
            card = Card.objects.get(customer=user)
            card.balance += recharge_amount
            card.save()

            response_data = {
                "message": f"Successfully recharged {recharge_amount} to the card",
                "card_balance": card.balance,
                "recharge_amount": recharge_amount
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Card.DoesNotExist:
            return Response({"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND)
    
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
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except :
            return Response({"error": "한 사람당 카드는 한 개만 생성 가능합니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Card created successfully"}, status=status.HTTP_201_CREATED)
    
    def get_queryset(self):
        if not self.request.user.is_authenticated:
            raise PermissionDenied("로그인을 해주세요.")
        return Card.objects.filter(customer=self.request.user)
    
    
        
class PurchaseViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

    def create(self, request, *args, **kwargs):
        count = int(request.data.get('count'))
        purchase_type = request.data.get('purchase_type')
        custom_product_id = request.data.get('product')
        # register = request.data.get('register') # 카드 등록 여부 프론트 한테 받아옵니다 (True, False)
        user = request.user
        if user.is_authenticated:
            register = user.register 

        user_card = get_object_or_404(Card, customer=request.user)
        product = Products.objects.get(product_id=custom_product_id)
        total = int(product.price * count)
        
        # if register == None : 
        #     register = request.user.register  # 또는 register = None
        register = request.user.register# user.register 값으로 초기화

        if not request.user.is_authenticated :
            return Response({"message" : "로그인을 해주세요."}, status=status.HTTP_401_UNAUTHORIZED)
    
        if purchase_type == "type1":
            cvc = request.data.get('cvc')
            num = request.data.get('num')
            validDate = request.data.get('validDate')
            pw = request.data.get('pw')
    
            if user_card.balance < total:
                return Response({"message": "잔액 부족"}, status=status.HTTP_400_BAD_REQUEST)

            if (cvc != user_card.cvc or
                num != user_card.num or
                pw != user_card.pw):
                return Response({"message": "카드 정보가 일치하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

            with transaction.atomic():
                user_card.balance -= total
                user_card.save()
            
                
        elif purchase_type == "type2":
            if register is False:
                # 사용자로부터 간편 카드 등록 여부 확인
                user_input = request.data.get('input_register')
                if user_input == "yes":
                    input_num = request.data.get('num')
                    input_cvc = request.data.get('cvc')
                    input_validDate = request.data.get('validDate')
                    input_pw = request.data.get('pw')

                    if (input_num == user_card.num and
                        input_cvc == user_card.cvc and
                        input_pw == user_card.pw):
                        register=True

                    else:
                        return Response({"message": "카드 정보가 일치하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

                elif user_input == "no":
                    return Response({"message": "간편 결제 카드 등록이 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"message": "올바른 입력 값을 선택해주세요."}, status=status.HTTP_400_BAD_REQUEST)
                
                
            elif register is True:
                if user_card.balance < total:
                    return Response({"message": "잔액이 부족합니다."}, status=status.HTTP_400_BAD_REQUEST)
                print("Balance before deduction:", user_card.balance)
                with transaction.atomic():
                    user_card.balance -= total
                    user_card.save()
                    print("Balance after deduction:", user_card.balance)  # 잔액 변경 후 출력

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
            register=register,
            card=user_card
        )
        purchase.save()
#만약 purchase가 진짜 구매했을 때만 반환하게 해야함.(카드값은 갱신 안ㄴ되긴 하지만 결제내역은감)
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