# pylint: disable=no-member
from django.db import models


class Resource(models.Model):
    url = models.CharField(max_length=300)
    title = models.CharField(max_length=100)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_resources',
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return f'Resource {self.id} - User {self.owner}'
