Gem::Specification.new do |spec|
  spec.name          = 'jekyll-theme-prologue'
  spec.version       = '0.3.2'
  spec.authors       = ['HTML5 UP', 'Chris Bobbe']
  spec.email         = ['csbobbe@gmail.com']

  spec.summary       = 'A Jekyll version of the Prologue theme by HTML5 UP.'
  spec.description   = 'A Jekyll version of the Prologue theme by HTML5 UP. ' /
                       'Demo: ' /
                       'https://chrisbobbe.github.io/jekyll-theme-prologue/'
  spec.homepage      = 'https://github.com/chrisbobbe/jekyll-theme-prologue'
  spec.license       = 'CC-BY-3.0'

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
                         f.match(/^(assets|_layouts|_includes|_sass|_config.yml|404.html|LICENSE|README)/i)
                       end

  spec.add_development_dependency 'bundler'
  spec.add_development_dependency 'jekyll', '~> 3.3'
end
