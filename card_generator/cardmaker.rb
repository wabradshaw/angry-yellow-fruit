#!/usr/bin/ruby -w
require 'squib'

# Config

OPINIONS_FILE = 'Gridpinions - Opinions.csv'
DESCRIPTIONS_FILE = 'Gridpinions - Descriptions.csv'
THEMES_FILE = 'Gridpinions - Themes.csv'
MAX_ADJECTIVES_COUNT = 30
MAX_THEMES_COUNT = 60

ADJ_BLEED_WIDTH = 597
ADJ_BLEED_HEIGHT = 447
ADJ_CUT_WIDTH = 525
ADJ_CUT_HEIGHT = 375
ADJ_SAFE_WIDTH = 453
ADJ_SAFE_HEIGHT = 303

THM_BLEED_WIDTH = 672
THM_CUT_WIDTH = 600
THM_SAFE_WIDTH = 540

STROKE = 12
RADIUS = 32
TEXT_SIZE = 21

OPINION_COLOUR = '#f5a400ff'
DESCRIPTION_COLOUR = '#ffff00ff'

# Main
puts "Start";

opinion_data = Squib.csv file: OPINIONS_FILE
descriptions_data = Squib.csv file: DESCRIPTIONS_FILE
themes_data = Squib.csv file: THEMES_FILE

Squib::Deck.new(cards: MAX_ADJECTIVES_COUNT, width: ADJ_BLEED_WIDTH, height: ADJ_BLEED_HEIGHT) do
  background color: 'white'
  rect radius: RADIUS, width: ADJ_SAFE_WIDTH, height: ADJ_SAFE_HEIGHT, x: (ADJ_BLEED_WIDTH - ADJ_SAFE_WIDTH)/2, y: (ADJ_BLEED_HEIGHT - ADJ_SAFE_HEIGHT)/2, fill_color: 'white', stroke_width: STROKE, stroke_color: OPINION_COLOUR  
  
  text str: opinion_data['Name'], width: ADJ_SAFE_WIDTH, height: ADJ_SAFE_HEIGHT, x: (ADJ_BLEED_WIDTH - ADJ_SAFE_WIDTH)/2, y: (ADJ_BLEED_HEIGHT - ADJ_SAFE_HEIGHT)/2, align: 'center', valign: 'middle', font_size: TEXT_SIZE, font: 'Atkinson Hyperlegible'
  save_png dir: '_opinions', prefix: '', count_format: opinion_data['Id']
end

Squib::Deck.new(cards: MAX_ADJECTIVES_COUNT, width: ADJ_BLEED_WIDTH, height: ADJ_BLEED_HEIGHT) do
  background color: 'white'
  rect radius: RADIUS, width: ADJ_SAFE_WIDTH, height: ADJ_SAFE_HEIGHT, x: (ADJ_BLEED_WIDTH - ADJ_SAFE_WIDTH)/2, y: (ADJ_BLEED_HEIGHT - ADJ_SAFE_HEIGHT)/2, fill_color: 'white', stroke_width: STROKE, stroke_color: DESCRIPTION_COLOUR  
  
  text str: descriptions_data['Name'], width: ADJ_SAFE_WIDTH, height: ADJ_SAFE_HEIGHT, x: (ADJ_BLEED_WIDTH - ADJ_SAFE_WIDTH)/2, y: (ADJ_BLEED_HEIGHT - ADJ_SAFE_HEIGHT)/2, align: 'center', valign: 'middle', font_size: TEXT_SIZE, font: 'Atkinson Hyperlegible'
  save_png dir: '_desc', prefix: '', count_format: descriptions_data['Id']
end

Squib::Deck.new(cards: 1, width: ADJ_BLEED_WIDTH, height: ADJ_BLEED_HEIGHT) do
  background color: 'white'
  png file: 'opinion.png', crop_corner_radius: RADIUS, crop_width: ADJ_SAFE_WIDTH, crop_height: ADJ_SAFE_HEIGHT, x: (ADJ_BLEED_WIDTH - ADJ_SAFE_WIDTH)/2, y: (ADJ_BLEED_HEIGHT - ADJ_SAFE_HEIGHT)/2
  save_png dir: '_opinions', prefix: '', count_format: 'back'
end

Squib::Deck.new(cards: 1, width: ADJ_BLEED_WIDTH, height: ADJ_BLEED_HEIGHT) do
  background color: 'white'
  png file: 'fact.png', crop_corner_radius: RADIUS*5, width: ADJ_SAFE_WIDTH, height: ADJ_SAFE_HEIGHT, x: (ADJ_BLEED_WIDTH - ADJ_SAFE_WIDTH)/2, y: (ADJ_BLEED_HEIGHT - ADJ_SAFE_HEIGHT)/2
  save_png dir: '_desc', prefix: '', count_format: 'back'
end

front_range = themes_data['Side'].each_with_index.select{ |t, i| t == 'Front'}.map {|t, i| i}.select{|i| i < MAX_THEMES_COUNT}
back_range = themes_data['Side'].each_with_index.select{ |t, i| t == 'Back'}.map {|t, i| i}.select{|i| i < MAX_THEMES_COUNT}

easy_range = themes_data['Type'].each_with_index.select{ |t, i| t == 'Easy'}.map {|t, i| i}.select{|i| i < MAX_THEMES_COUNT}
medium_range = themes_data['Type'].each_with_index.select{ |t, i| t == 'Medium'}.map {|t, i| i}.select{|i| i < MAX_THEMES_COUNT}
hard_range = themes_data['Type'].each_with_index.select{ |t, i| t == 'Hard'}.map {|t, i| i}.select{|i| i < MAX_THEMES_COUNT}

total_diagonal = THM_BLEED_WIDTH * Math.sqrt(2)
diagonal_width = total_diagonal - ADJ_SAFE_HEIGHT
corner_diagonal_offset = ADJ_SAFE_HEIGHT * Math.sqrt(2) * 0.5
height_down = THM_BLEED_WIDTH - corner_diagonal_offset

text_offset = diagonal_width * 0.1
text_width = diagonal_width - (2 * text_offset)
text_angle_offset = Math.sqrt(2) * text_offset * 0.5

Squib::Deck.new(cards: MAX_THEMES_COUNT, width: THM_BLEED_WIDTH, height: THM_BLEED_WIDTH) do
  background color: 'white'
  png range: easy_range, file: 'easy.png', crop_corner_radius: RADIUS, width: THM_SAFE_WIDTH, height: THM_SAFE_WIDTH, x: (THM_BLEED_WIDTH - THM_SAFE_WIDTH)/2, y: (THM_BLEED_WIDTH - THM_SAFE_WIDTH)/2
  png range: medium_range, file: 'medium.png', crop_corner_radius: RADIUS, width: THM_SAFE_WIDTH, height: THM_SAFE_WIDTH, x: (THM_BLEED_WIDTH - THM_SAFE_WIDTH)/2, y: (THM_BLEED_WIDTH - THM_SAFE_WIDTH)/2
  png range: hard_range, file: 'hard.png', crop_corner_radius: RADIUS, width: THM_SAFE_WIDTH, height: THM_SAFE_WIDTH, x: (THM_BLEED_WIDTH - THM_SAFE_WIDTH)/2, y: (THM_BLEED_WIDTH - THM_SAFE_WIDTH)/2

  rect width: diagonal_width, height: ADJ_SAFE_HEIGHT, x: 0, y: height_down, fill_color: 'white', angle: '-45deg', stroke_width: 0
  rect width: corner_diagonal_offset, height: corner_diagonal_offset, x: 0, y: height_down, fill_color: 'white', stroke_width: 0
  rect width: corner_diagonal_offset, height: corner_diagonal_offset, x: height_down, y: 0, fill_color: 'white', stroke_width: 0
  text str: themes_data['Name'], width: text_width, height: ADJ_SAFE_HEIGHT, x: text_angle_offset, y: height_down - text_angle_offset, fill_color: 'white', angle: '-45deg', stroke_width: 0, align: 'center', valign: 'middle', font_size: TEXT_SIZE, font: 'Atkinson Hyperlegible'

  #save_png range: front_range, dir: '_themes', prefix: "", count_format: themes_data['Id']
  save_png range: back_range, dir: '_themes', prefix: "", count_format: themes_data['Id'], rotate: :clockwise
end

puts "Done";
