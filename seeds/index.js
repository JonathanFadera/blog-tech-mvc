const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const users = [
    { username: "HarryPotter", password: "password1" },
    { username: "HermioneGranger", password: "password2" },
    { username: "RonWeasley", password: "password3" }
];

const blogs = [
    {
        title: "The Magic of Hogwarts",
        content: "Hogwarts School of Witchcraft and Wizardry is a truly magical place where students learn to harness their powers.",
        userId: 1
    },
    {
        title: "Unveiling the Secrets of Diagon Alley",
        content: "Diagon Alley is a bustling wizarding marketplace filled with shops selling everything from wands to magical creatures.",
        userId: 2
    },
    {
        title: "Mastering the Art of Potion Brewing",
        content: "Potion brewing is a delicate craft that requires precision and knowledge of various ingredients and incantations.",
        userId: 3
    }
];

const comments = [
    {
        body: "Great blog! It feels like we're casting a spell with each word.",
        blogId: 1,
        userId: 1
    },
    {
        body: "I have a question regarding the magical creatures mentioned in the content.",
        blogId: 2,
        userId: 2
    },
    {
        body: "This blog really helped me understand the intricacies of potion brewing. Excellent work!",
        blogId: 3,
        userId: 3
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(users, {
            individualHooks: true,
            returning: true,
        });

        await Blog.bulkCreate(blogs);

        await Comment.bulkCreate(comments);

        process.exit(0);
    }
    catch (err) {
        console.log(err);
    }
};
seedDatabase();