Feature: User Login
  As a user
  I want to login to the application
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should be logged in successfully

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message

  Scenario: Login with random user data using Faker
    Given I am on the login page
    When I enter random username and password
    And I click the login button
    Then I should see an error message