import unittest, datetime
from app import User, validate_start_end_time


class UserTest(unittest.TestCase):
    def test_validate_start_end_time_equal_false(self):
        # Arrange
        start_time = datetime.datetime.now()
        end_time = start_time + datetime.timedelta(days=1)
        _users = [User("", str(start_time), str(end_time))]

        # Act
        result = validate_start_end_time(start_time, end_time, 12, users=_users)

        # Assert
        self.assertFalse(result)

    def test_validate_start_end_time_basic_before_true(self):
        # Arrange
        start_time = datetime.datetime.now()
        end_time = start_time + datetime.timedelta(days=1)
        _users = [User("", str(start_time - datetime.timedelta(days=10)), str(end_time - datetime.timedelta(days=10)))]

        # Act
        result = validate_start_end_time(start_time, end_time, 12, users=_users)

        # Assert
        self.assertTrue(result)

    def test_validate_start_end_time_basic_after_true(self):
        # Arrange
        start_time = datetime.datetime.now()
        end_time = start_time + datetime.timedelta(days=1)
        _users = [User("", str(start_time + datetime.timedelta(days=10)), str(end_time + datetime.timedelta(days=10)))]

        # Act
        result = validate_start_end_time(start_time, end_time, 12, users=_users)

        # Assert
        self.assertTrue(result)

    def test_validate_start_end_time_case1(self):
        # Arrange
        start_time = datetime.datetime.now()
        end_time = start_time + datetime.timedelta(days=2)
        _users = [User("", str(start_time - datetime.timedelta(days=1)), str(end_time + datetime.timedelta(days=2)))]

        # Act
        result = validate_start_end_time(start_time, end_time, 12, users=_users)

        # Assert
        self.assertFalse(result)

    def test_validate_start_end_time_case1_reverse(self):
        # Arrange
        s1 = datetime.datetime.now()
        e1 = s1 + datetime.timedelta(days=2)
        s2 = s1 - datetime.timedelta(days=1)
        e2 = e1 + datetime.timedelta(days=2)
        _users = [User("", str(s1), str(e1))]

        # Act
        result = validate_start_end_time(s2, e2, 12, users=_users)

        # Assert
        self.assertFalse(result)

    def test_validate_start_end_time_case2(self):
        # Arrange
        start_time = datetime.datetime.now()
        end_time = start_time + datetime.timedelta(days=10)
        _users = [User("", str(start_time + datetime.timedelta(days=1)), str(end_time + datetime.timedelta(days=2)))]

        # Act
        result = validate_start_end_time(start_time, end_time, 12, users=_users)

        # Assert
        self.assertFalse(result)

    def test_validate_start_end_time_case3(self):
        # Arrange
        start_time = datetime.datetime.now()
        end_time = start_time + datetime.timedelta(days=5)
        _users = [User("", str(start_time + datetime.timedelta(days=1)), str(end_time + datetime.timedelta(days=2)))]

        # Act
        result = validate_start_end_time(start_time, end_time, 12, users=_users)

        # Assert
        self.assertFalse(result)