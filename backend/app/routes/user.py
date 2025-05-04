from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.user import UserInDB, UserUpdate
from app.utils.dependencies import get_current_user
from app.services.user import update_user

router = APIRouter()

@router.get("/me", response_model=UserInDB)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserInDB)
async def update_user_me(
    user_update: UserUpdate,
    current_user: UserInDB = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update_user(db, current_user, user_update)
