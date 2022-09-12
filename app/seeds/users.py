from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    goose = User(
        username='Goose', email='goose@aa.io', password='password', profile_pic='https://s.hdnux.com/photos/01/25/52/10/22454796/4/2400x0.jpg')
    toucan = User(
        username='Toucan', email='toucan@aa.io', password='password', profile_pic='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ramphastos_toco_Whipsnade_Zoo.jpg/500px-Ramphastos_toco_Whipsnade_Zoo.jpg')
    chirpy = User(
        username='Chirpy', email='chirpy@aa.io', password='password', profile_pic='https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Zebra-Finch.jpg')
    hawk = User(
        username='Hawk', email='chirpy@aa.io', password='password', profile_pic='https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Zebra-Finch.jpg')
    falco = User(
        username='Falco', email='chirpy@aa.io', password='password', profile_pic='https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Zebra-Finch.jpg')

    db.session.add(goose)
    db.session.add(toucan)
    db.session.add(chirpy)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
