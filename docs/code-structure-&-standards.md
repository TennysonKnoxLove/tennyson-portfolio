Tech Stack:
FE: Angular (Typescript), Vite, Material UI
BE: Prisma, Python

Architecture:
flowchart TD
subgraph FE [Frontend - NgRx]
FEComponent[Component]
FEFacade[Facade Service]
FEStore[NgRx Store]
FEAction[NgRx Action]
FEReducer[NgRx Reducer]
FEEffect[NgRx Effect]
FEApiService[Data Service (e.g., PortfolioDataService)]
FEApiFile[API Client (e.g., PortfolioApi)]
end

subgraph BE [Backend]
BEController[Controller]
BEService[Service]
BERepository[Repository]
BEModule[Module]
end

FEComponent --> FEFacade
FEFacade -- Dispatches --> FEAction
FEFacade -- Selects Data From --> FEStore
FEAction --> FEStore
FEStore -- State Updated By --> FEReducer
FEAction -- Triggers --> FEEffect
FEEffect --> FEApiService
FEApiService --> FEApiFile
FEApiFile --> BEController

BEController --> BEService
BEService --> BERepository
BEController --> BEModule
BEService --> BEModule
BERepository

FE File Structure: [Components (Folder)] -> { .html.ts
[feature-name (Folder, e.g., portfolio)]
[components (Folder)] ->
{ [component-name (Folder)] ->
{ .html
.scss (or .css)
.ts (component logic)
.spec.ts (tests)
}
}
[pages (Folder)] ->
{ [page-name (Folder)] ->
{ .html
.scss (or .css)
.ts (page component logic)
.spec.ts (tests)
}
}
[+state (Folder) OR store (Folder)] ->
{ [feature].actions.ts
[feature].reducer.ts
[feature].effects.ts
[feature].selectors.ts
[feature].state.ts
[feature].facade.ts
}
[services (Folder)] -> // For services called by Effects
{ [data-service-name].service.ts }
[api (Folder)] -> // For low-level API client, called by Data Services or Effects
{ [api-client-name].api.ts }
[types (Folder)] ->
{ [feature].types.ts (including state interfaces if not in +state)
global.types.ts
}

BE File Structure: [<Insert Code Purpose> (Folder)] ->
{ controller.py
service.py
Module.py }

[repository (Folder)] ->
{ [<Insert Table Name> (Folder)] ->
{ .repository } }

Coding Standards/Rules (FE): html - defines html structure,
Components - defines components; keep it logically dumb. Calls service.
Service - Defines logic for component, calls api
Api - Receives data and sends it off to BE controller endpoint.

Coding Standards/Rules (BE): controllers - Defines endpoints
Service - Defines endpoint logic to execute. Calls repository.
Module - Organizes code files into chunks so they can be imported in one place. Repository - Accesses database directly. (NOWHERE ELSE SHOULD DO THIS)

Data Models: (Uni-Connect):
Resources-
image - str
desc - str
tags - str[]
location - dict{ address: “”, zip: “”, city: “”, state: “”}
availability - dict{mon: “9am” …}
resourceOwner - userID
price - float
Users-
user - str

NOTE: ALL FILES MUST BE BELOW 300 LINES.
