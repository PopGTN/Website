# Use a slimmer Ruby base for development
FROM ruby:3.2-slim

LABEL maintainer="email@joshuamckenna.dev"
ENV LANG=C.UTF-8 \
    BUNDLE_JOBS=4 \
    BUNDLE_RETRY=3 \
    JEKYLL_ENV=development

# Install build-time deps + node (for assets)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      git \
      nodejs \
      npm \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy Gemfiles & install gems (caching layer)
COPY Gemfile Gemfile.lock ./
RUN gem install bundler \
    && bundle install --jobs "$BUNDLE_JOBS" --retry "$BUNDLE_RETRY"

# Copy your site’s source
COPY . .

# Expose Jekyll (4000) + LiveReload (35729)
EXPOSE 4000 35729

# Serve with live reload, drafts, incremental builds
CMD ["bundle", "exec", "jekyll", "serve",
     "--host", "0.0.0.0",
     "--port", "4000",
     "--livereload",
     "--incremental",
     "--drafts"]
