# Generated by Django 3.2.10 on 2023-12-29 13:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projet', '0003_auto_20231229_1417'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('user', models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='projet.user')),
            ],
        ),
        migrations.RemoveField(
            model_name='client',
            name='email',
        ),
        migrations.AddField(
            model_name='avocat',
            name='First_name',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='avocat',
            name='Last_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
    ]
