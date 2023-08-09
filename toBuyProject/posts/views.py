from django.shortcuts import render
import random
import string
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def create(self, request, *args, **kwargs):
        # 랜덤한 값을 생성하여 새로운 카드 인스턴스를 생성합니다.
        num = ''.join(random.choices(string.digits, k=16))  # 16자리 숫자
        cvc = ''.join(random.choices(string.digits, k=3))   # 3자리 숫자
        pw = ''.join(random.choices(string.digits, k=4))    # 4자리 숫자

        card_data = {
            'num': num,
            'cvc': cvc,
            'pw': pw,
        }

        serializer = self.get_serializer(data=card_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=201, headers=headers)