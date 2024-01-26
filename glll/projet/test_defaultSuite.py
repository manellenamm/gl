import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestDefaultSuite():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_untitled(self):
    # Test name: Untitled
    # Step # | name | target | value
    # 1 | setWindowSize | 569x707 | 
    self.driver.set_window_size(569, 707)
    # 2 | open | /Form/ | 
    self.driver.get("http://localhost:5173/Form/")
    # 3 | type | name=username | sisi
    self.driver.find_element(By.NAME, "username").send_keys("sisi")
    # 4 | type | name=password | sisi123
    self.driver.find_element(By.NAME, "password").send_keys("sisi123")
    # 5 | click | name=username | 
    self.driver.find_element(By.NAME, "username").click()
    # 6 | type | name=username | nina
    self.driver.find_element(By.NAME, "username").send_keys("nina")
    # 7 | click | css=.register | 
    self.driver.find_element(By.CSS_SELECTOR, ".register").click()
    # 8 | type | name=password | nina123
    self.driver.find_element(By.NAME, "password").send_keys("nina123")
    # 9 | click | name=confirmpwd | 
    self.driver.find_element(By.NAME, "confirmpwd").click()
    # 10 | type | name=confirmpwd | nina123
    self.driver.find_element(By.NAME, "confirmpwd").send_keys("nina123")
    # 11 | click | name=mobile | 
    self.driver.find_element(By.NAME, "mobile").click()
    # 12 | type | name=mobile | 049632056
    self.driver.find_element(By.NAME, "mobile").send_keys("049632056")
    # 13 | click | name=Email adress | 
    self.driver.find_element(By.NAME, "Email adress").click()
    # 14 | type | name=Email adress | nina@gmail.com
    self.driver.find_element(By.NAME, "Email adress").send_keys("nina@gmail.com")
    # 15 | click | name=image | 
    self.driver.find_element(By.NAME, "image").click()
    # 16 | click | name=speciality | 
    self.driver.find_element(By.NAME, "speciality").click()
    # 17 | type | name=speciality | mariage
    self.driver.find_element(By.NAME, "speciality").send_keys("mariage")
    # 18 | click | name=adress | 
    self.driver.find_element(By.NAME, "adress").click()
    # 19 | type | name=adress | france
    self.driver.find_element(By.NAME, "adress").send_keys("france")
    # 20 | click | name=langue | 
    self.driver.find_element(By.NAME, "langue").click()
    # 21 | type | name=langue | arabe
    self.driver.find_element(By.NAME, "langue").send_keys("arabe")
    # 22 | type | name=image | C:\fakepath\images.jpg
    self.driver.find_element(By.NAME, "image").send_keys("C:\\fakepath\\images.jpg")
    # 23 | click | css=.btn | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn").click()
    # 24 | type | name=email | sisi
    self.driver.find_element(By.NAME, "email").send_keys("sisi")
    # 25 | type | name=password | sisi123
    self.driver.find_element(By.NAME, "password").send_keys("sisi123")
    # 26 | type | name=email | nina
    self.driver.find_element(By.NAME, "email").send_keys("nina")
    # 27 | click | css=.btn | 
    self.driver.find_element(By.CSS_SELECTOR, ".btn").click()
    # 28 | click | name=email | 
    self.driver.find_element(By.NAME, "email").click()
    # 29 | type | name=password | nina123
    self.driver.find_element(By.NAME, "password").send_keys("nina123")
  
