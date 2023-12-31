import os


totalGlobalHeight = 0

for chapter in range(1, 21):
  totalChapterHeight = 0
  folder = './images/chapitre-' + chapter.__str__()
  _, _, files = next(os.walk(folder))
  file_count = len(files)

  totalChapterHeight = file_count * 1200
  totalGlobalHeight += totalChapterHeight
  print('Chapitre ' + chapter.__str__() + ': ' + totalGlobalHeight.__str__() + 'px')

print('Total: ' + totalGlobalHeight.__str__() + 'px')
