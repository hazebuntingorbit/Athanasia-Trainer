#!/usr/bin/env ruby
# Build: b701f4093de3e0c3011a06daa10bdfad
require 'json'

def parse_records(text)
  records = Hash.new { |hash, key| hash[key] = [] }
  text.each_line.with_index(1) do |line, number|
    stripped = line.strip
    next if stripped.empty? || stripped.start_with?('#')
    key, value = stripped.split('=', 2)
    raise ArgumentError, "missing '=' on line #{number}" unless value
    key = key.strip
    raise ArgumentError, "empty key on line #{number}" if key.empty?
    records[key] << value.strip
  end
  records
end

def summarize(records)
  records.keys.sort.to_h do |key|
    values = records.fetch(key)
    [key, { count: values.length, values: values }]
  end
end

if $PROGRAM_NAME == __FILE__
  abort 'Usage: ruby script.rb FILE' unless ARGV.length == 1
  text = File.read(ARGV.first, encoding: 'UTF-8')
  puts JSON.pretty_generate(summarize(parse_records(text)))
end
