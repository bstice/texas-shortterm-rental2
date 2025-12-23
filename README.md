# Texas Short-Term Rental

A project built using [Spec-Driven Development](https://github.com/github/spec-kit) methodology.

## What is Spec-Driven Development?

Spec-Driven Development (SDD) emphasizes creating detailed specifications before coding, ensuring clarity and alignment throughout the development process. This project uses the GitHub Spec Kit toolkit to facilitate:

- **Intent-Driven Development**: Define what to build before how to build it
- **Rich Specification Creation**: Use guardrails and organizational principles
- **Multi-Step Refinement**: Iterative refinement rather than one-shot generation

## Project Structure

```
texas-shortterm-rental/
├── memory/
│   └── constitution.md         # Project principles and guidelines
├── specs/
│   └── NNN-feature-name/      # Feature specifications (numbered)
│       ├── spec.md            # Requirements and user stories
│       ├── plan.md            # Technical implementation plan
│       ├── tasks.md           # Detailed task breakdown
│       └── research.md        # Technical research
├── templates/                  # Spec-kit templates
└── scripts/                    # Helper scripts

```

## Getting Started

### 1. Define Your Constitution

Start by defining your project's guiding principles:

```
/speckit.constitution
```

### 2. Create Feature Specifications

Describe what you want to build:

```
/speckit.specify I want to build [your feature description]
```

### 3. Plan Implementation

Generate a technical plan:

```
/speckit.plan
```

### 4. Generate Tasks

Break down the plan into actionable tasks:

```
/speckit.tasks
```

### 5. Implement

Execute the implementation:

```
/speckit.implement
```

## Available Commands

- `/speckit.constitution` - Define or update project principles
- `/speckit.specify [description]` - Create feature specification
- `/speckit.clarify` - Clarify requirements
- `/speckit.plan` - Create technical plan
- `/speckit.tasks` - Generate task breakdown
- `/speckit.implement` - Execute implementation
- `/speckit.analyze` - Analyze codebase
- `/speckit.checklist` - Generate quality checklists

## Documentation

- [Spec Kit Repository](https://github.com/github/spec-kit)
- [Quick Start Guide](https://github.github.com/spec-kit/quickstart.html)
- [Spec-Driven Development Guide](https://github.github.com/spec-kit/index.html)

## Feature Specifications

- **001-guidebook-website**: Main guidebook website specification (completed)
- **002-ai-chatbot**: AI chatbot feature specification (completed)
- **003-pdf-export**: Downloadable PDF guidebook feature specification (new)

## License

[Your License Here]

