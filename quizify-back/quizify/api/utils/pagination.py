from rest_framework.pagination import PageNumberPagination as BasePageNumberPagination


class PageNumberPagination(BasePageNumberPagination):
    page_query_param = "page"
    page_size_query_param = "size"
    page_size = 5
    max_page_size = 10
