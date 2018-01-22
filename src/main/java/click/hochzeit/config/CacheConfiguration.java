package click.hochzeit.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Profile.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Profile.class.getName() + ".features", jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Statistic.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Feature.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Feature.class.getName() + ".profiles", jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Image.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Gallery.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Inquiry.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.Banner.class.getName(), jcacheConfiguration);
            cm.createCache(click.hochzeit.domain.DataImport.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
