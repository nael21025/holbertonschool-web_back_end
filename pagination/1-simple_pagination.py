#!/usr/bin/env python3
"""
Module that provides simple pagination for a dataset of baby names.
"""

import csv
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Return a tuple containing the start and end indexes for pagination.

    Args:
        page (int): The page number, starting from 1.
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: The start index and the end index.
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize a Server instance."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Load and cache the dataset from the CSV file.

        Returns:
            List[List]: The dataset without the header row.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return the requested page of the dataset.

        Args:
            page (int): The page number, starting from 1.
            page_size (int): The number of rows per page.

        Returns:
            List[List]: A list of rows for the requested page.
            Returns an empty list if the page is out of range.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start, end = index_range(page, page_size)
        data = self.dataset()

        if start >= len(data):
            return []

        return data[start:end]
