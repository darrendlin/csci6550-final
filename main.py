import csv
import time
from riotwatcher import RiotWatcher
from requests import HTTPError

watcher = RiotWatcher('RGAPI-6913a3c6-51c9-4b73-9454-3b9638454cc7')

def printProgress(players, index):
  print('Players: {:d}/{:d} ({:.2%})'.format(index, len(players), index/len(players)))

def getPlayers():
  players = []
  with open('players.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
      players.append({
        'accountId': row[0],
        'summonerId': row[1],
        'leagueId': row[2],
        'updated': row[3]
      })
  return players

def getLeagues():
  leagues = []
  with open('leagues.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
      leagues.append({
        'leagueId': row[0]
      })
  return leagues

def getMatches():
  matches = []
  with open('matches.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
      matches.append({
        'matchId': row[0]
      })
  return matches

def savePlayers(players):
  with open('players.csv', 'w+') as file:
    writer = csv.writer(file)
    for player in players:
      writer.writerow([player['accountId'], player['summonerId'], player['leagueId'], player['updated']])
    print('Saved players data!')

def saveLeagues(leagues):
  with open('leagues.csv', 'w+') as file:
    writer = csv.writer(file)
    for league in leagues:
      writer.writerow([league['leagueId']])

def saveMatches(matches):
  with open('matches.csv', 'w+') as file:
    writer = csv.writer(file)
    for match in matches:
      writer.writerow([match['matchId']])

def addPlayer(players, index, region, summonerId, leagueId):
  if not any(p['summonerId'] == summonerId for p in players):
    summoner = watcher.summoner.by_id(region, summonerId)
    players.append({
      'accountId': summoner['accountId'],
      'summonerId': summonerId,
      'leagueId': leagueId,
      'updated': int(time.time())
    })
    printProgress(players, index)

region = 'na1'
players = getPlayers()
leagues = getLeagues()
matches = getMatches()


for index, player in enumerate(players):
  printProgress(players, index)
  if not any(l['leagueId'] == player['leagueId'] for l in leagues):
    league_positions = watcher.league.positions_by_summoner(region, player['summonerId'])
    for league_position in league_positions:
      if league_position['queueType'] == 'RANKED_SOLO_5x5':
        leagueId = league_position['leagueId']
        if not any(l['leagueId'] == leagueId for l in leagues):
          league = watcher.league.by_id(region, league_position['leagueId'])
          for entry in league['entries']:
            addPlayer(players, index, region, entry['playerOrTeamId'], leagueId)
          leagues.append({
            'leagueId': leagueId
          })
          saveLeagues(leagues)
          savePlayers(players)
  matchlist = watcher.match.matchlist_by_account(region, player['accountId'])
  for matchlist_item in matchlist['matches']:
    matchId = matchlist_item['gameId']
    if not any(matchId == m['matchId'] for m in matches):
      match = watcher.match.by_id(region, matchId)
      print('Crawling match', matchId)
      for player in match['participantIdentities']:
        addPlayer(players, index, region, player['player']['summonerId'], None)
      matches.append({
        'matchId': matchId
      })
      saveMatches(matches)
      savePlayers(players)
