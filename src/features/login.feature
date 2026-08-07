Feature: User Authentication

  Background:
    Given I am on the Demo Web Shop login page

  Scenario: Successful login with valid credentials (CI/CD Green Pass)
    When I login with valid credentials
    Then I should be logged in successfully

  Scenario Outline: Unsuccessful login with invalid credentials
    When I attempt to login with email "<email>" and password "<password>"
    Then I should see the error message "<errorMessage>"

    Examples:
      | email                       | password       | errorMessage                                                     |
      | [VALID_EMAIL]               | wrongpass      | Login was unsuccessful. Please correct the errors and try again. |
      | unregistered_email@test.com |                | Login was unsuccessful. Please correct the errors and try again. |
      |                             | Password123!   | No customer account found                                        |
      | invalid-email-format        | Password123!   | Please enter a valid email address.                              |

  Scenario: Verify Password masking, Remember Me, and Forgot Password presence
    Then the password field should be masked
    And the Remember Me checkbox should be present and unchecked
    And the Forgot Password link should be visible

  Scenario: Successful login using the Enter key
    When I fill in valid credentials and press Enter
    Then I should be logged in successfully