# {{TECHNOLOGY_NAME}} Style Guide

_An opinionated guide to {{TECHNOLOGY_NAME}} syntax, conventions, and application structure._

## Instructions for AI Generation

**🚨 IMPORTANT: Derive from Actual Project Files**
The examples provided in this template are illustrative and may not represent your specific project's technology stack, file structure, or conventions. **Always analyze the actual project files** to determine:

- File extensions and naming patterns used
- Technology stack and frameworks
- Existing code organization and structure
- Current naming conventions
- Testing patterns and tools
- Build/configuration files present

**Do not rely solely on the template examples** - they are generic placeholders. Instead, examine the project files to understand the real patterns in use.

**Replace these placeholders throughout the document:**

- `{{TECHNOLOGY_NAME}}` - The specific technology/framework (derived from project files)
- `{{FILE_EXTENSION}}` - Primary file extension (from actual files)
- `{{TEST_EXTENSION}}` - Test file extension (from actual test files)
- `{{LANGUAGE_CONVENTIONS}}` - Naming conventions (observed in codebase)
- `{{PACKAGE_MANAGER}}` - Package manager (from package.json, requirements.txt, etc.)
- `{{ECOSYSTEM_SPECIFIC}}` - Framework/language-specific concepts (from actual code)

**Language-Specific Adaptation Required:**

1. **Analyze actual project files** to determine technology stack and patterns
2. Update all code examples to match the **observed** language syntax and style
3. Replace naming conventions with those **actually used** in the project
4. Modify project structure to reflect **existing** organization patterns
5. Update tool configurations based on **present** configuration files
6. Add language-specific best practices relevant to the **detected** technology stack

## Table of Contents

1. [Style Vocabulary](#style-vocabulary)
2. [File Structure Conventions](#file-structure-conventions)
3. [Single Responsibility](#single-responsibility)
4. [Naming Conventions](#naming-conventions)
5. [Project Structure](#project-structure)
6. [Code Organization](#code-organization)
7. [Best Practices](#best-practices)
8. [Testing](#testing)
9. [Tools and Configuration](#tools-and-configuration)
10. [Appendix](#appendix)

---

## Style Vocabulary

Each guideline describes either a good or bad practice, and all have a consistent presentation.

**Do** is one that should always be followed. These guidelines should rarely be broken.

**Consider** guidelines should generally be followed. If you fully understand the reasoning and have a good justification to deviate, then do so. Aim to be consistent.

**Avoid** indicates something you should almost never do. Code examples to avoid have clear warnings.

**Why?** sections provide reasoning for following the recommendations.

---

## File Structure Conventions

### File Naming Patterns

**Style [XX-XX]**

**Do** use consistent naming patterns for all files.

**Do** use descriptive names that clearly indicate the file's purpose.

**Do** follow the pattern: `[feature].[type].[extension]`

**Example patterns:**

```
{{LANGUAGE_CONVENTIONS}} naming with {{FILE_EXTENSION}} extension:

user.service{{FILE_EXTENSION}}
user.controller{{FILE_EXTENSION}}
user.model{{FILE_EXTENSION}}
user{{TEST_EXTENSION}}

// NOTE: These are generic examples only!
// Always examine actual project files to determine:
// - Real file extensions in use (.js, .ts, .py, .java, etc.)
// - Actual naming patterns observed in the codebase
// - Existing directory structure and organization
// - Current testing file patterns

// Common patterns by language (adapt based on your project):
// JavaScript: user.service.js, user.test.js
// Python: user_service.py, test_user_service.py
// Java: UserService.java, UserServiceTest.java
// Go: user_service.go, user_service_test.go
// C#: UserService.cs, UserServiceTests.cs
```

**Why?**

- Consistent naming makes files easy to locate
- Clear patterns help identify file types at a glance
- Automated tools can easily process files following patterns

### File Organization

**Style [XX-XX]**

**Do** separate words in file names with dashes (kebab-case).

**Do** use dots to separate the descriptive name from the type.

**Avoid** abbreviations that could be ambiguous.

```
// Good - Follow {{LANGUAGE_CONVENTIONS}}
user-profile.service{{FILE_EXTENSION}}
payment-gateway.controller{{FILE_EXTENSION}}
auth-middleware{{FILE_EXTENSION}}

// Language Examples:
// JavaScript: user-profile.service.js (kebab-case files, camelCase code)
// Python: user_profile_service.py (snake_case throughout)
// Java: UserProfileService.java (PascalCase files and classes)
// Go: user_profile_service.go (snake_case files, camelCase/PascalCase code)

// Avoid - Inconsistent or unclear naming
{{ECOSYSTEM_SPECIFIC}}
```

---

## Single Responsibility

Apply the single responsibility principle to all modules, classes, functions, and files.

### Rule of One

**Style [XX-XX]**

**Do** define one primary concept per file (one class, one function set, one module).

**Consider** limiting files to 400 lines of code.

**Why?**

- Makes files easier to read, maintain, and debug
- Reduces merge conflicts in version control
- Facilitates code reuse and testing
- Prevents hidden dependencies and tight coupling

### Example - Avoid

```{{FILE_EXTENSION}}
// Avoid - Multiple responsibilities in one file
// user-everything{{FILE_EXTENSION}}

{{ECOSYSTEM_SPECIFIC}}
// Example structure that violates single responsibility:
// - Multiple classes/functions with different purposes
// - Mixed concerns (data access, business logic, presentation)
// - Tightly coupled components

// Language-specific anti-pattern examples:
// JavaScript: Mixing React components with API calls and utilities
// Python: Combining Django models, views, and utility functions
// Java: Multiple public classes in one file
// Go: Multiple packages worth of functionality in one file
```

### Example - Preferred

```{{FILE_EXTENSION}}
// Separate files following {{LANGUAGE_CONVENTIONS}}:

// user.model{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

// user.service{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

// user.controller{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

// validation.utils{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific separation examples:

JavaScript/TypeScript:
- user.model.ts, user.service.ts, user.controller.ts
- Clear separation with ES6 modules

Python:
- user_model.py, user_service.py, user_controller.py
- Use __init__.py for package organization

Java:
- UserModel.java, UserService.java, UserController.java
- Package-based organization with clear responsibilities

Go:
- user.go (models), service.go, handler.go
- Package-level organization with focused files
*/
```

---

## Naming Conventions

Naming conventions are crucial for maintainability and readability.

### General Naming Guidelines

**Style [XX-XX]**

**Do** use consistent names for all symbols.

**Do** follow a pattern that describes the symbol's feature then its type.

**Do** use meaningful and pronounceable names.

**Avoid** abbreviations and single-letter variables (except for short loops).

### Language-Specific Conventions

#### Variables and Functions

```{{FILE_EXTENSION}}
// Follow {{LANGUAGE_CONVENTIONS}} for your target language:

{{ECOSYSTEM_SPECIFIC}}

// Language-specific examples:
// JavaScript/TypeScript: camelCase variables, PascalCase classes
const userName = 'john_doe';
const getUserProfile = () => {};
class UserManager {}

// Python: snake_case for variables/functions, PascalCase for classes
user_name = 'john_doe'
def get_user_profile():
class UserManager:

// Java: camelCase variables/methods, PascalCase classes
String userName = "johnDoe";
public User getUserProfile() {}
public class UserManager {}

// Go: camelCase private, PascalCase public
userName := "johnDoe"
func getUserProfile() {}
func GetUserProfile() {} // Public
type UserManager struct {}

// C#: PascalCase for public, camelCase for private/local
public string UserName = "johnDoe";
public User GetUserProfile() {}
private string userName;
```

#### Files and Directories

```
// Follow {{LANGUAGE_CONVENTIONS}} file naming:
{{ECOSYSTEM_SPECIFIC}}

// Language-specific patterns:
// JavaScript: kebab-case files, camelCase code
user-profile.service.js
components/user-dashboard.component.js

// Python: snake_case throughout
user_profile_service.py
components/user_dashboard_component.py

// Java: PascalCase files matching class names
UserProfileService.java
components/UserDashboardComponent.java

// Go: snake_case files, package-based organization
user_profile_service.go
components/user_dashboard.go

// C#: PascalCase files, namespace organization
UserProfileService.cs
Components/UserDashboardComponent.cs
```

### Descriptive Naming Examples

| Symbol Type   | Example                  | File Name            |
| ------------- | ------------------------ | -------------------- |
| Service Class | `{{ECOSYSTEM_SPECIFIC}}` | `{{FILE_EXTENSION}}` |
| Controller    | `{{ECOSYSTEM_SPECIFIC}}` | `{{FILE_EXTENSION}}` |
| Model         | `{{ECOSYSTEM_SPECIFIC}}` | `{{FILE_EXTENSION}}` |
| Utility       | `{{ECOSYSTEM_SPECIFIC}}` | `{{FILE_EXTENSION}}` |
| Test          | `{{ECOSYSTEM_SPECIFIC}}` | `{{TEST_EXTENSION}}` |

**Language-Specific Examples:**

| Language   | Service                                             | Controller                                     | Model                                | Test                                               |
| ---------- | --------------------------------------------------- | ---------------------------------------------- | ------------------------------------ | -------------------------------------------------- |
| JavaScript | `class PaymentService` → `payment.service.js`       | `class UserController` → `user.controller.js`  | `class Product` → `product.model.js` | `describe('UserService')` → `user.service.test.js` |
| Python     | `class PaymentService` → `payment_service.py`       | `class UserController` → `user_controller.py`  | `class Product` → `product_model.py` | `class TestUserService` → `test_user_service.py`   |
| Java       | `class PaymentService` → `PaymentService.java`      | `class UserController` → `UserController.java` | `class Product` → `Product.java`     | `class UserServiceTest` → `UserServiceTest.java`   |
| Go         | `type PaymentService struct` → `payment_service.go` | `type UserHandler struct` → `user_handler.go`  | `type Product struct` → `product.go` | `func TestUserService` → `user_service_test.go`    |

**⚠️ IMPORTANT**: These examples are illustrative only. **Analyze your actual project files** to determine the real naming patterns, file extensions, and organizational structure in use. Your project may follow different conventions than shown above.

---

## Project Structure

### Overall Structure Guidelines

**Style [XX-XX]**

**Do** start small but keep long-term growth in mind.

**Do** organize code by feature, not by file type.

**Do** place all source code in a `src` folder.

**Consider** creating a folder for a feature when it has multiple related files.

### Folder-by-Feature Structure

**Do** create folders named for the feature area they represent.

```
src/
├── features/
│   ├── authentication/
│   │   ├── auth.service{{FILE_EXTENSION}}
│   │   ├── auth.controller{{FILE_EXTENSION}}
│   │   ├── auth.middleware{{FILE_EXTENSION}}
│   │   └── auth{{TEST_EXTENSION}}
│   ├── user-management/
│   │   ├── user.model{{FILE_EXTENSION}}
│   │   ├── user.service{{FILE_EXTENSION}}
│   │   ├── user.controller{{FILE_EXTENSION}}
│   │   └── user{{TEST_EXTENSION}}
│   └── payment/
│       ├── payment.service{{FILE_EXTENSION}}
│       ├── payment.controller{{FILE_EXTENSION}}
│       └── payment{{TEST_EXTENSION}}
├── shared/
│   ├── utils/
│   ├── middleware/
│   └── constants/
├── config/
└── tests/
    ├── integration/
    └── fixtures/

{{ECOSYSTEM_SPECIFIC}}
/*
Language-specific variations:

⚠️ ANALYZE YOUR PROJECT FILES TO DETERMINE ACTUAL STRUCTURE!
The examples below are common patterns, but your project may differ:

Python:
- Add __init__.py files for packages
- tests/ might be separate from src/
- Consider using src/package_name/ structure

Java:
- Use package structure: src/main/java/com/company/
- Separate src/main and src/test directories
- Maven/Gradle standard layout

Go:
- cmd/ for applications, internal/ for private code
- pkg/ for public libraries
- No deep nesting, packages at root level

C#:
- Project/solution structure with .csproj files
- Namespace organization matches folder structure
- Tests in separate project

⚠️ Your project may use a completely different structure - examine the actual files!
*/
```

**Why?**

- Features are easily located and identified
- Reduces deep nesting
- Makes it easier to find related files
- Scales well as the application grows

### Shared Code Organization

**Style [XX-XX]**

**Do** create a shared folder for reusable code.

**Do** place utilities, helpers, and common functions in the shared folder.

**Avoid** placing feature-specific code in shared folders.

```
src/
├── shared/
│   ├── utils/
│   │   ├── validation.utils.js
│   │   ├── date.utils.js
│   │   └── string.utils.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── logging.middleware.js
│   ├── constants/
│   │   ├── http-status.constants.js
│   │   └── error-messages.constants.js
│   └── types/
│       └── common.types.ts
```

---

## Code Organization

### Function and Class Structure

**Style [XX-XX]**

**Do** organize class members in a consistent order.

**Do** place public members before private members.

**Consider** grouping related functionality together.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}
/*
Example class/function organization pattern:

Language-specific member ordering:
- JavaScript/TypeScript: constructor, public methods, private methods
- Python: __init__, public methods, private methods (prefixed with _)
- Java: public fields, private fields, constructor, public methods, private methods
- Go: exported fields, unexported fields, methods (receiver methods)
- C#: public properties, private fields, constructor, public methods, private methods

The key is consistency within your chosen language's conventions.
*/

// Generic structure adapted to {{LANGUAGE_CONVENTIONS}}:
class UserService {
  // 1. {{ECOSYSTEM_SPECIFIC}} properties/fields

  // 2. Constructor/initialization

  // 3. Public methods ({{LANGUAGE_CONVENTIONS}})

  // 4. Private methods ({{LANGUAGE_CONVENTIONS}})
}
```

### Import Organization

**Style [XX-XX]**

**Do** organize imports in a consistent order.

**Do** group imports by type (external libraries, internal modules, relative imports).

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

// Language-specific import organization:

// JavaScript/TypeScript:
// 1. External libraries, 2. Internal modules, 3. Relative imports

// Python:
// 1. Standard library, 2. Third-party, 3. Local imports

// Java:
// 1. java.* imports, 2. javax.* imports, 3. Third-party, 4. Local

// Go:
// 1. Standard library, 2. External packages, 3. Internal packages

// C#:
// 1. System namespaces, 2. Third-party, 3. Project namespaces

// Generic pattern (adapt syntax for your language):
// External/standard library imports
{{ECOSYSTEM_SPECIFIC}}

// Internal application imports
{{ECOSYSTEM_SPECIFIC}}

// Relative/local imports
{{ECOSYSTEM_SPECIFIC}}
```

### Error Handling

**Style [XX-XX]**

**Do** implement consistent error handling patterns.

**Do** create custom error classes for different error types.

**Do** handle errors at appropriate levels.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific error handling patterns:

JavaScript/TypeScript: try/catch with Error classes
Python: try/except with custom Exception classes
Java: try/catch with Exception hierarchy
Go: explicit error return values
C#: try/catch with Exception classes
Rust: Result<T, E> types
*/

// Custom error class (adapt to language syntax):
{{ECOSYSTEM_SPECIFIC}}

// Service with error handling (adapt to language patterns):
{{ECOSYSTEM_SPECIFIC}}
```

---

## Best Practices

### Performance Considerations

**Style [XX-XX]**

**Do** consider performance implications of your code.

**Do** use appropriate data structures for the task.

**Avoid** premature optimization.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific performance considerations:

JavaScript: Use Map/Set, avoid memory leaks, async/await patterns
Python: List comprehensions, generators, avoid global variables
Java: StringBuilder for strings, stream API, proper collection choice
Go: Avoid memory allocations, use sync.Pool, buffered channels
C#: StringBuilder, LINQ efficiency, IDisposable pattern
Rust: Zero-cost abstractions, borrowing vs ownership
*/

// Example: Efficient data structures (adapt syntax):
// Use appropriate collection types for frequent operations
{{ECOSYSTEM_SPECIFIC}}
```

### Security Best Practices

**Style [XX-XX]**

**Do** validate all inputs.

**Do** sanitize data before processing.

**Do** use parameterized queries for database operations.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific security patterns:

JavaScript/Node.js: Input validation, SQL injection prevention, XSS protection
Python: SQL injection (use parameterized queries), input validation
Java: PreparedStatement, input validation, secure coding practices
Go: SQL injection prevention, input validation, secure HTTP
C#: SQL injection prevention, input validation, secure coding
*/

// Input validation example (adapt to language):
{{ECOSYSTEM_SPECIFIC}}

// Secure database query example (adapt to language/ORM):
{{ECOSYSTEM_SPECIFIC}}
```

### Documentation

**Style [XX-XX]**

**Do** write clear and concise comments.

**Do** document complex business logic.

**Do** keep documentation up to date with code changes.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific documentation patterns:

JavaScript/TypeScript: JSDoc comments
Python: docstrings (Google/NumPy/Sphinx style)
Java: Javadoc comments
Go: Regular comments above declarations
C#: XML documentation comments
Rust: /// comments with examples
*/

/**
 * {{ECOSYSTEM_SPECIFIC}}
 *
 * Language-specific documentation format:
 * - Use appropriate doc comment syntax for your language
 * - Include parameter types and return types
 * - Provide usage examples
 * - Document error conditions
 */
```

---

## Testing

### Test File Organization

**Style [XX-XX]**

**Do** name test files with appropriate extensions for your language:

- JavaScript/TypeScript: `.test.js`, `.spec.ts`
- Python: `test_*.py` or `*_test.py`
- Java: `*Test.java`
- Go: `*_test.go`
- C#: `*Tests.cs`
- Rust: Tests in same file or `tests/` directory

**Do** organize tests using your language's testing framework conventions.

**Do** organize tests logically with clear descriptions.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific test organization:

JavaScript: describe/it with Jest/Mocha
Python: unittest.TestCase or pytest functions
Java: JUnit @Test annotations with class organization
Go: func TestXxx(t *testing.T) pattern
C#: [TestClass] and [TestMethod] attributes
Rust: #[test] attribute on functions
*/

// Generic test structure (adapt to language framework):
// Test suite for FeatureService
  // Test group for specific method
    // Test case: should handle expected scenario
    // Test case: should handle error scenario
```

### Test Structure

**Style [XX-XX]**

**Do** follow the Arrange-Act-Assert pattern.

**Do** use descriptive test names that explain the scenario.

**Do** test both happy path and edge cases.

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific test patterns:

JavaScript: Arrange-Act-Assert with async/await
Python: setUp/tearDown or pytest fixtures
Java: @Before/@After annotations, assertions
Go: table-driven tests, subtests with t.Run
C#: [SetUp]/[TearDown], Assert methods
Rust: assert! macros, #[should_panic] for error tests

Generic AAA pattern (adapt syntax and assertions):
*/

// Test: should calculate expected result correctly
  // Arrange - Set up test data
  {{ECOSYSTEM_SPECIFIC}}

  // Act - Execute the function/method
  {{ECOSYSTEM_SPECIFIC}}

  // Assert - Verify the result
  {{ECOSYSTEM_SPECIFIC}}
```

---

## Tools and Configuration

### Code Formatting

**Style [XX-XX]**

**Do** use automated code formatting tools.

**Do** configure formatting rules consistently across the team.

**Example configuration files:**

**{{PACKAGE_MANAGER}} Configuration:**

```json
{{ECOSYSTEM_SPECIFIC}}

Language-specific examples:
- JavaScript: package.json, .eslintrc.json, .prettierrc
- Python: pyproject.toml, setup.py, .flake8, requirements.txt
- Java: pom.xml (Maven), build.gradle (Gradle), checkstyle.xml
- Go: go.mod, .golangci.yml
- C#: .csproj, .editorconfig, Directory.Build.props
- Rust: Cargo.toml, rustfmt.toml, clippy.toml
```

**Linting Configuration:**

````json
{{ECOSYSTEM_SPECIFIC}}

Common linting tools by language:
- JavaScript/TypeScript: ESLint, Prettier
- Python: flake8, black, isort, mypy
- Java: Checkstyle, SpotBugs, PMD
- Go: golangci-lint, gofmt, goimports
- C#: StyleCop, EditorConfig
- Rust: clippy, rustfmt
``` "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
````

**Development Workflow:**

```json
{{ECOSYSTEM_SPECIFIC}}

Language-specific workflow examples:

JavaScript/Node.js:
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "prettier --write", "git add"]
  }
}

Python (pre-commit config):
repos:
  - repo: https://github.com/psf/black
    rev: stable
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: 3.9.2
    hooks:
      - id: flake8

Java (Maven):
<plugin>
  <groupId>com.spotify.fmt</groupId>
  <artifactId>fmt-maven-plugin</artifactId>
</plugin>

Go (Makefile):
.PHONY: lint
lint:
	golangci-lint run ./...
	gofmt -s -w .

C# (.editorconfig):
[*.cs]
indent_style = space
indent_size = 4
```

---

## Appendix

### Quick Reference

#### File Naming Patterns (adapt to your language)

- Services: `[feature].service{{FILE_EXTENSION}}`
- Controllers: `[feature].controller{{FILE_EXTENSION}}`
- Models: `[feature].model{{FILE_EXTENSION}}`
- Tests: `[feature]{{TEST_EXTENSION}}`
- Utilities: `[feature].utils{{FILE_EXTENSION}}`

#### Naming Conventions (update for {{LANGUAGE_CONVENTIONS}})

- **Variables/Functions**: {{LANGUAGE_CONVENTIONS}}
- **Classes**: {{LANGUAGE_CONVENTIONS}}
- **Constants**: {{LANGUAGE_CONVENTIONS}}
- **Files**: {{LANGUAGE_CONVENTIONS}}
- **Directories**: {{LANGUAGE_CONVENTIONS}}

**Language-Specific Quick Reference:**

⚠️ **IMPORTANT**: The table below shows common conventions by language, but **your project may use different patterns**. Always examine your actual files to determine the conventions in use.

| Language   | Variables            | Classes    | Constants            | Files      |
| ---------- | -------------------- | ---------- | -------------------- | ---------- |
| JavaScript | camelCase            | PascalCase | SCREAMING_SNAKE_CASE | kebab-case |
| Python     | snake_case           | PascalCase | SCREAMING_SNAKE_CASE | snake_case |
| Java       | camelCase            | PascalCase | SCREAMING_SNAKE_CASE | PascalCase |
| Go         | camelCase/PascalCase | PascalCase | PascalCase           | snake_case |
| C#         | camelCase/PascalCase | PascalCase | PascalCase           | PascalCase |
| Rust       | snake_case           | PascalCase | SCREAMING_SNAKE_CASE | snake_case |

**🔍 DERIVE ACTUAL CONVENTIONS**: Look at your project's existing code to see what naming conventions are actually being used, rather than assuming standard language conventions.

#### Common Patterns

- One primary concept per file
- Feature-based folder organization
- Consistent import ordering
- Clear error handling
- Comprehensive testing

### Code Templates

Consider using code snippets or templates for common patterns in {{TECHNOLOGY_NAME}}:

**Service Template**:

```{{FILE_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
⚠️ IMPORTANT: Examine actual project code to understand real patterns!

Language-specific service patterns (adapt based on what you observe in the project):

JavaScript/TypeScript:
class FeatureService {
  constructor(dependencies) {}
  async getEntity(id) {}
  async createEntity(data) {}
}

Python:
class FeatureService:
    def __init__(self, dependencies):
    async def get_entity(self, entity_id):
    async def create_entity(self, data):

Java:
@Service
public class FeatureService {
    public FeatureService(Dependencies deps) {}
    public Entity getEntity(String id) {}
    public Entity createEntity(EntityData data) {}
}

Go:
type FeatureService struct {
    deps Dependencies
}
func (s *FeatureService) GetEntity(id string) (*Entity, error) {}
func (s *FeatureService) CreateEntity(data EntityData) (*Entity, error) {}

C#:
public class FeatureService {
    public FeatureService(IDependencies deps) {}
    public async Task<Entity> GetEntityAsync(string id) {}
    public async Task<Entity> CreateEntityAsync(EntityData data) {}
}

⚠️ Your project may use different patterns, frameworks, or architectures!
*/
```

**Test Template**:

```{{TEST_EXTENSION}}
{{ECOSYSTEM_SPECIFIC}}

/*
Language-specific test patterns:

JavaScript/TypeScript:
describe('FeatureService', () => {
  let service;
  beforeEach(() => { service = new FeatureService(); });
  describe('methodName', () => {
    it('should handle expected case', () => {});
  });
});

Python:
class TestFeatureService(unittest.TestCase):
    def setUp(self):
        self.service = FeatureService()
    def test_method_name_expected_case(self):

Java:
@ExtendWith(MockitoExtension.class)
class FeatureServiceTest {
    @InjectMocks private FeatureService service;
    @Test void methodName_expectedCase_shouldReturnExpectedResult() {}
}

Go:
func TestFeatureService_MethodName(t *testing.T) {
    service := NewFeatureService()
    tests := []struct {
        name string
        want expectedType
    }{
        {"expected case", expectedValue},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {})
    }
}

C#:
[TestClass]
public class FeatureServiceTests {
    private FeatureService _service;
    [TestInitialize]
    public void Setup() { _service = new FeatureService(); }
    [TestMethod]
    public void MethodName_ExpectedCase_ShouldReturnExpectedResult() {}
}
*/
```

---

_This style guide should be adapted to your specific technology stack, team preferences, and project requirements. The key is maintaining consistency and clear communication within your development team._

## AI Generation Checklist

When using this template to generate a language-specific style guide, ensure you:

**✅ Required Replacements:**

- [ ] **Analyze actual project files first** before making any replacements
- [ ] Replace all `{{TECHNOLOGY_NAME}}` placeholders with detected technology
- [ ] Update `{{FILE_EXTENSION}}` with observed file extensions
- [ ] Replace `{{TEST_EXTENSION}}` with actual test file patterns
- [ ] Update `{{LANGUAGE_CONVENTIONS}}` with observed naming patterns
- [ ] Replace `{{PACKAGE_MANAGER}}` with detected package manager
- [ ] Fill in all `{{ECOSYSTEM_SPECIFIC}}` sections with project-specific content

**✅ Language-Specific Adaptations:**

- [ ] **Base all adaptations on observed project patterns**, not generic examples
- [ ] Update all code examples to match actual project syntax and style
- [ ] Modify naming conventions to reflect what's actually used in the codebase
- [ ] Adapt project structure to match existing organization
- [ ] Include only tools and configurations actually present in the project
- [ ] Add framework/library-specific practices relevant to detected stack
- [ ] Update import/dependency patterns based on actual usage
- [ ] Modify error handling to match existing project patterns
- [ ] Adapt testing framework examples to match what's actually used

**✅ Content Verification:**

- [ ] **All examples derived from actual project files**, not template defaults
- [ ] All placeholder text has been replaced with project-specific content
- [ ] Code examples match the actual technology stack and patterns observed
- [ ] Naming conventions reflect real usage in the codebase
- [ ] Tool configurations match what's actually configured in the project
- [ ] Best practices align with both community standards AND project patterns
- [ ] Examples demonstrate patterns actually found in the project
- [ ] File structure matches the real project organization

**✅ Final Polish:**

- [ ] Remove any remaining generic placeholders or example text
- [ ] Ensure all recommendations are relevant to the detected technology stack
- [ ] Verify all references match the actual project setup
- [ ] Add links to documentation for the specific frameworks/tools in use
- [ ] Include project-specific tooling and development workflow recommendations
