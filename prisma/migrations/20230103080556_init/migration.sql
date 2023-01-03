-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "company" TEXT,
    "website" TEXT,
    "location" TEXT,
    "email" TEXT,
    "skills" TEXT[],
    "status" TEXT NOT NULL,
    "bio" TEXT,
    "githubusername" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL,
    "createdAt" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldsofstudy" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "youtube" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_profileId_key" ON "Experience"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_profileId_key" ON "Education"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_profileId_key" ON "Social"("profileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
