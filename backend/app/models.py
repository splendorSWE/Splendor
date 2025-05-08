pass
# fake temp user class
class User:
    def __init__(self, user_id, name, email, profile_image=None):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.profile_image = profile_image

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "email": self.email,
            "profile_image": self.profile_image,
        }