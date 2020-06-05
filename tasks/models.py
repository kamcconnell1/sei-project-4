# pylint: disable=no-member
from django.db import models

class Task(models.Model):
    notes = models.CharField(max_length=1000)
    added_date = models.DateField(auto_now_add=True)
    reminder_date = models.DateField(null=True, blank=True)
    task_category = models.ForeignKey(
        'task_categories.TaskCategory',
        related_name='tasks',
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_tasks',
        on_delete=models.CASCADE
    )
    
    def __str__(self):
        return f'Task {self.id}'