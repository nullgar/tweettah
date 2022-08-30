from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    goose = User(
        username='Goose', email='goose@aa.io', password='password')
    toucan = User(
        username='Toucan', email='toucan@aa.io', password='password')
    chirpy = User(
        username='Chirpy', email='chirpy@aa.io', password='password')

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
