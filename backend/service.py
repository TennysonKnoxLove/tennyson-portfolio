from repository import UserRepository, ResourceRepository, PortfolioRepository, DockerRepository
from fastapi import UploadFile

class UserService:
    @staticmethod
    async def get_user(user_id: str):
        return await UserRepository.get_user_by_id(user_id)

    @staticmethod
    async def login_user(login_data: dict):
        username = login_data.get("username")
        if not username:
            # Or raise a specific error if username is absolutely required
            return None 
        # Assuming your UserRepository will have a method to find/create a user
        # This method name is a placeholder, adjust to your actual repository method
        return await UserRepository.find_or_create_user_by_username(username)

class ResourceService:
    @staticmethod
    async def get_all_resources():
        return await ResourceRepository.get_all_resources()

    @staticmethod
    async def create_resource(resource_data: dict):
        return await ResourceRepository.create_resource(resource_data)

    @staticmethod
    async def get_my_resources(user_id: str):
        # Assuming your ResourceRepository will have this method
        return await ResourceRepository.get_resources_by_user_id(user_id)

    @staticmethod
    async def delete_resource(resource_id: str):
        return await ResourceRepository.delete_resource(resource_id)

    @staticmethod
    async def upload_image(file: UploadFile):
        return await ResourceRepository.upload_image(file)

class PortfolioService:
    @staticmethod
    async def get_portfolio_data():
        return await PortfolioRepository.get_portfolio_data()

class DockerService:
    @staticmethod
    async def start_containers():
        return await DockerRepository.start_containers()

    @staticmethod
    async def stop_containers():
        return await DockerRepository.stop_containers()

    @staticmethod
    async def get_container_status():
        return await DockerRepository.get_container_status()

    # California Project methods
    @staticmethod
    async def california_start_containers():
        return await DockerRepository.california_start_containers()

    @staticmethod
    async def california_stop_containers():
        return await DockerRepository.california_stop_containers()

    @staticmethod
    async def california_health_check():
        return await DockerRepository.california_health_check()

    @staticmethod
    async def california_get_app_url():
        return await DockerRepository.california_get_app_url()

    @staticmethod
    async def montana_start_containers():
        return await DockerRepository.montana_start_containers()

    @staticmethod
    async def montana_stop_containers():
        return await DockerRepository.montana_stop_containers()

    @staticmethod
    async def montana_get_container_status():
        return await DockerRepository.montana_get_container_status()

    @staticmethod
    async def montana_health_check():
        return await DockerRepository.montana_health_check()

    @staticmethod
    async def montana_get_app_url():
        return await DockerRepository.montana_get_app_url() 