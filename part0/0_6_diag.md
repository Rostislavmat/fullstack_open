```mermaid
sequenceDiagram
    participant browser
    participant server
    
    
    Note right of browser: The browser starts processing and updates the local list.
    
    Note right of browser: The browser redraws the notes based on local list.
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Note created / Error
    deactivate server

    Note right of browser: The browser ignores result code.
```    