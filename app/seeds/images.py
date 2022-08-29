from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        tweet_id=1, user_id=1, url='https://cdn.sci.news/images/enlarge3/image_4495e-Toucan.jpg'
        )
    image2 = Image(
        tweet_id=2, user_id=3, url='https://i.natgeofe.com/n/d472dd3c-8d38-4eed-ae62-7472a12a17de/secretary-bird-thumbnail-nationalgeographic_2331336_4x3.jpg'
        )
    image3 = Image(
        tweet_id=3, user_id=2, url='https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg'
        )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
