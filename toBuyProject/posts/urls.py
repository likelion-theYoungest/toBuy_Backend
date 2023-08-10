from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CardViewSet, PurchaseViewSet

product_router = SimpleRouter(trailing_slash=False)
product_router.register('products', ProductViewSet, basename='products')
card_router = DefaultRouter()
card_router.register(r'cards', CardViewSet)  # 'cards' URL pattern with CardViewSet
purchase_router = DefaultRouter()
purchase_router.register(r'purchases', PurchaseViewSet)  # 'purchases' URL pattern with PurchaseViewSet

urlpatterns = [
    path('', include(product_router.urls)),
    path('', include(card_router.urls)),
    path('', include(purchase_router.urls)),
    path('products/<str:category>/', ProductViewSet.as_view({'get': 'list_by_category'}), name='product_list_by_category'),
    path('products/<str:category>/<str:product_id>/', ProductViewSet.as_view({'get': 'product_detail'}), name='product_detail'),
    path('my_purchases/', PurchaseViewSet.as_view({'get': 'my_purchases'}), name='my_purchases'),
]
