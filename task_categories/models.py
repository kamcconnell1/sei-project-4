from django.db import models

class TaskCategory(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.name}'
