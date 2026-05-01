from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .services.strategy import ElectionContext, LocalElectionStrategy, NationalElectionStrategy
from .services.election_data_service import ElectionDataService
from .services.pii_scrubber import PIIScrubber
from .utils.simplicity_filter import SimplicityFilter
from .utils.exceptions import DemocracyNavigatorException, global_exception_handler, UserFriendlyException

app = FastAPI(title="Democracy Navigator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(DemocracyNavigatorException, global_exception_handler)

data_service = ElectionDataService()

@app.post("/api/plan")
async def get_election_plan(request: Request):
    try:
        body = await request.json()
        election_type = body.get("type", "local")
        user_input = body.get("user_input", "")
        
        # Security: Scrub all input for PII
        safe_input = PIIScrubber.scrub(user_input)
        
        # Strategy Pattern for election types
        if election_type == "local":
            strategy = LocalElectionStrategy()
        elif election_type == "national":
            strategy = NationalElectionStrategy()
        else:
            raise UserFriendlyException("We don't recognize that election type")
            
        context = ElectionContext(strategy)
        milestones = context.get_election_plan()
        
        # Accessibility: Apply Simplicity Filter to milestones
        for m in milestones:
            m['title'] = SimplicityFilter.process(m['title'])
            
        return {
            "safe_input": safe_input,
            "milestones": milestones,
            "cached_info": data_service.get_election_data("default_location")
        }
    except DemocracyNavigatorException as e:
        raise e
    except Exception as e:
        # Catch unexpected errors to prevent technical data leakage
        raise UserFriendlyException("Something went wrong while planning your election")

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
