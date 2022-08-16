# Tweet on Release GH Action

This simple action gets the latest release from the AddTodoist repo and tweets it when a new release is published.

## This action requires some entry info

```yml
consumer-key:
  description: 'The consumer key of the twitter application'
consumer-secret:
  description: 'The consumer secret of the twitter application'
access-token:
  description: 'The access token of the twitter application'
access-token-secret:
  description: 'The access token secret of the twitter application'
```

## Example GH Action

```yml
name: Release
on:
  push:
    branches:
      - main
jobs:
  tweet:
    needs: release
    name: Tweet Release Info
    runs-on: ubuntu-latest
    steps:
      - name: Tweet Release
        uses: AddToDoist/tweet-on-release-action@v1.2.1
        with:
          consumer-key: ${{ secrets.CONSUMER_KEY }}
          consumer-secret: ${{ secrets.CONSUMER_SECRET }}
          access-token: ${{ secrets.ACCESS_TOKEN }}
          access-token-secret: ${{ secrets.ACCESS_TOKEN_SECRET }}
```

## Development

1. Make changes to source code
2. Update package.json version
3. Build the source with `yarn build`
4. Commit and push changes to repo
5. From github: create a new release

## License

MIT © [David Jiménez](https://dubis.dev)