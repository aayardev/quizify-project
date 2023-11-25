from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch

from .factories import QuestionFactory


User = get_user_model()


class PrivateQuizAPITest(TestCase):
    """Test authenticated quiz APIs."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="user@example.com",
            password="testpass123",
        )
        self.client.force_authenticate(self.user)

    @patch("api.views.quizzes.create_chat_completion")
    def test_create_quiz_api(self, mocked_chat_completion):
        """Test the creation of a quiz through the creation endpoint."""
        mocked_chat_completion.return_value = QuestionFactory.build_batch(5)
        payload = {"topic": "python"}
        url = reverse("api:quiz_create")
        res = self.client.post(url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["created_by"]["email"], self.user.email)
        self.assertEqual(res.data["topic"]["name"], payload["topic"])
        self.assertEqual(len(res.data["questions"]), 5)
