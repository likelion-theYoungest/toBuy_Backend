from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
import random
import string
from .models import Card
from .serializers import CardSerializer

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
            'customer': request.user.id  # 또는 적절한 user 식별자
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response({"message": "Card created successfully"}, status=status.HTTP_201_CREATED)
