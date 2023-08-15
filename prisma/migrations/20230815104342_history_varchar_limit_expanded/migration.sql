-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `FK_posts_users`;

-- AlterTable
ALTER TABLE `posts` MODIFY `author_email` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `FK_posts_users` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;
