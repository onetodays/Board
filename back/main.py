
import os
import sys
root_path = os.getcwd()
# print(root_path)
sys.path.append(root_path)
import asyncio

from fastapi import FastAPI
from controller.TaskboardController import app as Taskboard
from controller.UserController import app as User
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pathlib import Path


app = FastAPI()

app.include_router(Taskboard, prefix="/taskboard",tags=["taskboard"])
app.include_router(User, prefix="/user",tags=["user"])


# 允许跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许的前端地址
    allow_credentials=True,
    allow_methods=["*"],  # 允许的请求方法
    allow_headers=["*"],  # 允许的请求头
)


if __name__ == "__main__":
    uvicorn.run(app=f'{Path(__file__).stem}:app', port=8000,reload=False,host="127.0.0.1")



