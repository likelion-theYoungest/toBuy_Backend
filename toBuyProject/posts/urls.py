from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CardViewSet

router = DefaultRouter()
router.register(r'cards', CardViewSet)  # 'cards' URL 패턴에 CardViewSet 뷰셋 등록

urlpatterns = [
    path('', include(router.urls)),
]
