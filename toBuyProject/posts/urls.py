from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CardViewSet

product_router = SimpleRouter(trailing_slash=False)
product_router.register('products', ProductViewSet, basename='products')
card_router = DefaultRouter()
card_router.register(r'cards', CardViewSet)  # 'cards' URL 패턴에 CardViewSet 뷰셋 등록

urlpatterns = [
    path('', include(product_router.urls)),
    path('', include(card_router.urls)),
    path('products/<str:category>/', ProductViewSet.as_view({'get': 'list_by_category'}), name='product_list_by_category'),
    path('products/<str:category>/<str:product_id>/', ProductViewSet.as_view({'get': 'product_detail'}), name='product_detail'),
]