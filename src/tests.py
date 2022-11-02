from black import assert_equivalent
from Airtable import *
import unittest

class TestAirtableData(unittest.TestCase):
    def setup(self):
        a =  Airtable()

    def test_data(self):
        a = Airtable()
        data = a.getData()
        if data:
            return True
        else:
            raise Exception("airtable data empty")

    def test_getSurgeryByKey(self):
        a = Airtable()
        data = a.getSurgeryByKey("knee")
        if "rows" in data:
            return True
        else:
            raise Exception("rows does not exist in dict")

    def test_key1(self):
        a = Airtable()
        data = a.getSurgeryByKey("knee")
        if "knee" in data:
            raise Exception("rows does not exist in dict")
        else:
            return True

    def test_key2(self):
        a = Airtable()
        test_key = "randomness1213132121312jsbfbsnbfsd"
        data = a.getSurgeryByKey(test_key)
        if len(data["rows"]) > 0:
            raise Exception("data should not exist for random key")
        else:
            return True


    def test_search(self):
        a = Airtable()
        data = a.getDataByQuery("knee")
        for column_dict in data["rows"]:
            if "knee" in column_dict["Name"]:
                continue
            else:
                raise Exception("this data does not have query related data")
    
            


if __name__ == "__main__":
    unittest.main()


# class TestStringMethods(unittest.TestCase):
      
#     def setUp(self):
#         pass
  
#     # Returns True if the string contains 4 a.
#     def test_strings_a(self):
#         self.assertEqual( 'a'*4, 'aaaa')
  
#     # Returns True if the string is in upper case.
#     def test_upper(self):        
#         self.assertEqual('foo'.upper(), 'FOO')
  
#     # Returns TRUE if the string is in uppercase
#     # else returns False.
#     def test_isupper(self):        
#         self.assertTrue('FOO'.isupper())
#         self.assertFalse('Foo'.isupper())
  
#     # Returns true if the string is stripped and 
#     # matches the given output.
#     def test_strip(self):        
#         s = 'geeksforgeeks'
#         self.assertEqual(s.strip('geek'), 'sforgeeks')
  
#     # Returns true if the string splits and matches
#     # the given output.
#     def test_split(self):        
#         s = 'hello world'
#         self.assertEqual(s.split(), ['hello', 'world'])
#         with self.assertRaises(TypeError):
#             s.split(2)
  
# if __name__ == '__main__':
#     unittest.main()