-- CreateTable
CREATE TABLE "LobbyEntry" (
    "sessionId" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId1" TEXT NOT NULL,
    "sessionId2" TEXT NOT NULL,
    "lastActionTimestamp" DATETIME NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_sessionId1_key" ON "Game"("sessionId1");

-- CreateIndex
CREATE UNIQUE INDEX "Game_sessionId2_key" ON "Game"("sessionId2");
