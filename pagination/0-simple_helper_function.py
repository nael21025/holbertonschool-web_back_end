#!/usr/bin/env python3
"""
Module that provides a helper function for pagination.

The index_range function calculates the start and end indexes
for a given page and page size.
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Returns a tuple containing the start and end indexes for pagination.

    Args:
        page (int): current page number (starting from 1)
        page_size (int): number of items per page

    Returns:
        tuple: (start_index, end_index)
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
