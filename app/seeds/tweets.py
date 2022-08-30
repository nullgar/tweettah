from app.models import db, Tweet


# Adds a demo user, you can add other users here if you want
def seed_tweets():
    tweet1 = Tweet(
        user_id=1, tweet='much wow first tweet')
    tweet2 = Tweet(
        user_id=3, tweet='Tweetthing is cool!')
    tweet3 = Tweet(
        user_id=2, tweet='I Chirp!!!!!')

    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tweets():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
