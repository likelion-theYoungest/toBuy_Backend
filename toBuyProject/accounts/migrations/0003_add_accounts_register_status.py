# Generated by Django 4.2.4 on 2023-08-16 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_remove_user_birth_remove_user_nickname_user_email_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="register_status",
            field=models.BooleanField(default=False),
        ),
    ]
