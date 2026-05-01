from fastapi import Request, status
from fastapi.responses import JSONResponse

class DemocracyNavigatorException(Exception):
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code

class UserFriendlyException(DemocracyNavigatorException):
    """Exception providing user-friendly, non-technical feedback."""
    pass

async def global_exception_handler(request: Request, exc: DemocracyNavigatorException):
    """Global error handler providing simple feedback for users."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": f"Oops! {exc.message}. Please try again."},
    )
