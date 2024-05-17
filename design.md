## Test Design

```mermaid

graph TD
    %% Define Subgraphs (Columns)
    subgraph Local_Development [Local Development]
        A1[Local Development]
        A2[Environment Variables (.env file)]
    end

    subgraph Docker_Orchestration [Docker Orchestration]
        B1[Docker orchestration]
        subgraph Docker_Services [Services]
            B2[Test Config Store]
            B3[Mocked Data]
            B4[Service A]
            subgraph Testing_Framework [Testing Framework]
                C1[Suites]
                C2[Test Runner]
                C3[Reporter]
                C4[Test Artifacts]
            end
        end
    end

    subgraph Github_Actions [Github Actions]
        D1[Unit Tests and Security Scan]
        D2[Smoke Test - snippet from Integration tests]
        D3[Integration Tests - Merge to main]
        D4[Nightly - Full End to End]
        D5[Performance Tests - Pre-Release]
        D6[Environment Variables]
    end

    subgraph Report_Generation [Report Generation]
        E1[File Report]
    end

    %% Connect Nodes
    A1 --> B1
    A2 --> B1
    B1 --> D1
    B1 --> D2
    B1 --> D3
    B1 --> D4
    B1 --> D5
    D1 --> E1
    D2 --> E1
    D3 --> E1
    D4 --> E1
    D5 --> E1
    D6 --> D1
    D6 --> D2
    D6 --> D3
    D6 --> D4
    D6 --> D5
    B2 --> C1
    B3 --> C1
    B4 --> C1
    C1 --> C2
    C2 --> C3
    C3 --> C4


    ```
