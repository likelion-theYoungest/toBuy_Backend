from .models import User
from rest_framework import serializers
#from django.contrib.auth import authenticate #사용자인증 
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework import serializers
#회원가입 중복 확인
class UserSerializer(serializers.ModelSerializer):
    password_check = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 'password_check', 'phone')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password_check']:
            raise serializers.ValidationError("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_check') #유효성 검사 후 삭제
        user = User.objects.create_user(**validated_data)
        return user
    
#이메일찾기
class UserEmailSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone = serializers.CharField()

    def validate(self, data):
        name = data.get('name')
        phone = data.get('phone')
        try:
            user = User.objects.get(name=name, phone=phone)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")
        data['user'] = user  # 유저 객체를 저장하여 후에 활용할 수 있도록 함
        return data
    
#비밀번호 찾기
class UserPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    phone = serializers.CharField()
    name = serializers.CharField()

    def validate(self, data):
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')

        try:
            user = User.objects.get(name=name, phone=phone, email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found.")
        
        data['user'] = user 
        return data
    

# class UserPasswordSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     phone = serializers.CharField()
#     name = serializers.CharField()

#     def validate(self, data):
#         name = data.get('name')
#         phone = data.get('phone')
#         email = data.get('email')

#         try:
#             user = User.objects.get(name=name, phone=phone, email=email)
#         except User.DoesNotExist:
#             raise serializers.ValidationError("User not found.")
        
#         self.send_password_reset_email(user)
#         return data
    
#     def send_password_reset_email(self, user):
#         # 생성한 토큰을 데이터베이스에 저장
#         token = default_token_generator.make_token(user)

#         # 비밀번호 재설정 링크 생성
#         reset_link = reverse('password-reset', args=[token])

#         # 이메일 발송
#         subject = "비밀번호 재설정 요청"
#         message = f"비밀번호를 재설정하려면 아래 링크를 클릭하세요:\n\n{reset_link}"
#         from_email = "noreply@example.com"
#         recipient_list = [user.email]
#         send_mail(subject, message, from_email, recipient_list)

#회원정보확인 _로그인된 사용자와 현재 입력한 정보랑 일치하는지
class UserExistenceSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = self.context['request'].user  # 현재 로그인된 사용자 객체

        if user.email == email and user.check_password(password):
            return data
        else:
            raise serializers.ValidationError("이메일 또는 비밀번호가 일치하지 않습니다.")
        
# 비밀번호 수정(로그인 된 경우에만)
class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    new_password = serializers.CharField()
    new_password_check = serializers.CharField()

    def validate(self, data):
        password = data.get('password')
        new_password = data.get('new_password')
        new_password_check = data.get('new_password_check')

        user = self.context['request'].user  # 로그인 된 상태

        if not user.check_password(password):
            raise serializers.ValidationError("기존 비밀번호가 일치하지 않습니다.")

        if new_password != new_password_check:
            raise serializers.ValidationError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.")

        return data