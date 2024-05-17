## Test Design

```mermaid

flowchart LR
    A[Local Development]
    B[(Mocked Data)]
    subgraph Test Pipeline
        direction TB
        C[Test Config Store]
        D[Env Variables]
        E[Suites]
        F[Test Runner]
        G[Reporter]
        H[Test Artifacts]
    end
    I((Docker Orchestration))
    subgraph Github Actions
        direction TB
        J[Unit Tests\nSecurity Scan]
        K[@Smoke Test - snippet from Integration tests]
        L[@Integration tests (Merge to main)]
        M[@Nightly (Full End 2 End)]
        N[@Performance Tests (Pre-Release)]
    end
    O[File Report]

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> O

    I --- C
    H --- J
    J --> K
    K --> L
    L --> M
    M --> N
    N --> O



    ```
