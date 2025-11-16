<!--
Sync Impact Report:
- Version: 1.0.0 (Initial ratification)
- This is the initial constitution for the texas-shortterm-rental project
- Establishes 6 core principles focused on rental management best practices
- Templates: ✅ All templates reviewed and compatible with these principles
- No deferred TODOs
-->

# Texas Short-Term Rental Constitution

## Core Principles

### I. Data Integrity First

All rental data (bookings, payments, guest information, property details) MUST maintain consistency and accuracy at all times. This includes:

- Bookings cannot overlap for the same property
- Payment records must be immutable once processed
- Guest information must be validated before storage
- Property availability must reflect real-time booking status
- All financial transactions must be auditable

**Rationale**: Short-term rental management requires absolute trust in data accuracy. Double bookings, lost payments, or incorrect guest information can result in legal issues, financial loss, and reputation damage.

### II. Security & Privacy (NON-NEGOTIABLE)

Guest personal information and payment data MUST be protected according to industry standards and Texas privacy laws:

- All sensitive data encrypted at rest and in transit
- PCI-DSS compliance for payment processing
- Guest data access limited to authorized users only
- Audit logs for all data access and modifications
- Regular security assessments and penetration testing
- No storage of full credit card numbers or CVV codes

**Rationale**: Rental platforms handle highly sensitive personal and financial data. Security breaches can result in identity theft, financial fraud, legal liability, and business closure.

### III. User Experience Excellence

The platform MUST prioritize intuitive, efficient workflows for all user types (property owners, guests, administrators):

- Common tasks completable in 3 clicks or less
- Mobile-responsive design for all interfaces
- Clear error messages with actionable guidance
- Booking process completable in under 3 minutes
- Real-time updates for availability and booking status
- Accessibility compliance (WCAG 2.1 AA minimum)

**Rationale**: In the competitive short-term rental market, user experience directly impacts conversion rates, guest satisfaction, and owner retention.

### IV. Compliance & Legal Requirements

All features MUST comply with Texas short-term rental regulations and local ordinances:

- Occupancy tax collection and remittance capabilities
- Registration number tracking for properties (where required)
- Minimum stay enforcement options
- Guest capacity limits enforcement
- HOA/condo rule compliance tracking
- Terms of service acceptance for all parties

**Rationale**: Texas cities (Austin, Dallas, San Antonio, etc.) have varying STR regulations. Non-compliance can result in fines, property bans, and legal action against both platform and property owners.

### V. Test-First Development (NON-NEGOTIABLE)

All new functionality MUST follow Test-Driven Development:

- Write tests before implementation
- User must approve tests before code is written
- Red-Green-Refactor cycle strictly enforced
- Integration tests required for:
  - Booking flow (search → book → confirm)
  - Payment processing
  - Calendar synchronization
  - User authentication and authorization
  - Email/SMS notifications
- Minimum 80% code coverage for business logic
- All critical paths must have end-to-end tests

**Rationale**: Bugs in rental management systems (double bookings, payment failures, lost reservations) have immediate, severe consequences. TDD ensures reliability before code reaches production.

### VI. Observability & Maintainability

All systems MUST be observable, debuggable, and maintainable:

- Structured logging for all operations (JSON format)
- Distributed tracing for multi-service operations
- Metrics for business operations (bookings, revenue, occupancy)
- Error tracking with context and stack traces
- Performance monitoring (response times, database queries)
- Documentation required for all APIs and integrations
- Code must be self-documenting with clear naming

**Rationale**: Short-term rental platforms operate 24/7 with real-time bookings. Issues must be identified and resolved quickly to prevent revenue loss and guest dissatisfaction.

## Technology Constraints

### Platform Requirements

- **API-First Architecture**: All functionality must be accessible via REST APIs
- **Database**: PostgreSQL or similar ACID-compliant relational database for transactional data
- **Payment Processing**: Use certified payment gateway (Stripe, Square, or similar) - never handle raw payment data
- **Calendar Integration**: Support iCal format for external calendar synchronization (Airbnb, VRBO, etc.)
- **Notification System**: Email and SMS notification capabilities with delivery tracking

### Performance Standards

- Page load time: < 2 seconds for 95th percentile
- API response time: < 500ms for 95th percentile
- Booking search results: < 1 second for up to 1000 properties
- Support for 100 concurrent booking transactions
- 99.9% uptime SLA during peak booking seasons

### Scalability Considerations

- Horizontal scaling capability for application tier
- Database read replicas for reporting queries
- Caching layer for frequently accessed data (property details, availability)
- Asynchronous processing for non-critical operations (emails, analytics)

## Development Workflow

### Feature Development Process

1. **Specification**: Create detailed spec using `/speckit.specify` (requirements, user stories, success criteria)
2. **Planning**: Generate technical plan using `/speckit.plan` (architecture, tech stack decisions, data models)
3. **Task Breakdown**: Create actionable tasks using `/speckit.tasks`
4. **Test Creation**: Write tests first, get approval before implementation
5. **Implementation**: Execute using `/speckit.implement`
6. **Review**: Code review with constitution compliance check
7. **Deploy**: Staged deployment (dev → staging → production)

### Quality Gates

Before any feature can be merged:

- [ ] All tests passing (unit, integration, e2e)
- [ ] Code coverage ≥ 80% for business logic
- [ ] Security review completed (for authentication, payment, or data access features)
- [ ] Compliance check passed (for features touching bookings, payments, or guest data)
- [ ] Performance benchmarks met
- [ ] Documentation updated (API docs, user guides)
- [ ] Constitution principles verified

### Code Review Requirements

All changes require:

- Minimum 1 peer review
- Automated linting and formatting checks passed
- No introduction of known security vulnerabilities (dependency scanning)
- Verification of constitution principle compliance
- For critical features (booking, payment): Minimum 2 reviewers including senior developer

## Governance

### Constitutional Authority

This constitution supersedes all other development practices and guidelines. In case of conflict between this constitution and any other guidance, the constitution takes precedence.

### Amendment Process

Amendments to this constitution require:

1. Written proposal with rationale
2. Impact analysis on existing codebase
3. Team consensus (unanimous for core principles, majority for other sections)
4. Version bump following semantic versioning:
   - **MAJOR**: Removal or incompatible changes to core principles
   - **MINOR**: New principles or sections added
   - **PATCH**: Clarifications, typo fixes, non-semantic changes
5. Documentation of changes in Sync Impact Report
6. Migration plan for existing code (if applicable)

### Compliance Verification

- All pull requests must include a constitutional compliance checklist
- Any deviation from principles must be explicitly justified and documented
- Complexity must always be justified against simpler alternatives
- When in doubt, consult this constitution before making architectural decisions

### Guidance Integration

For AI agents working on this codebase:

- Always reference this constitution when making design decisions
- Use `.cursorrules` file for runtime development guidance
- Document any assumed interpretations of principles
- Flag ambiguities for human review rather than making assumptions

**Version**: 1.0.0 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-16
